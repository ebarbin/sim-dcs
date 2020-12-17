var net = require('dgram');
var moment = require('moment');

const Position = require('./schemas/Position');
const Pilot = require('./schemas/Pilot');
const AircraftModel = require('./schemas/AircraftModel');


var udpserver = net.createSocket('udp4');

udpserver.on('error', (err) => {
    console.log('server error:\n ' + err.stack);
    udpServer.close();
});

udpserver.on('message', (msg, rinfo) => {
    console.log(msg + ' from ' + rinfo.address + ':' + rinfo.port);

    const data = msg.toString('utf-8').split(',');
    const eventType = data[1];
    const aircraftModel = data[5];
    const userName = data[6];
    const weaponType =  data[7];
    const weaponName = data[8];

    if (eventType == 'S_EVENT_MISSION_START' || eventType == 'S_EVENT_MISSION_END') {
        //Restart positions

        await Position.deleteMany();
        console.log('Map positions removed!!!');
        
        return;
    }
    
    //if (userName == 'AI') return;

    const pilot = await Pilot.findOne({userName: userName});
    
    if (eventType == 'S_EVENT_BIRTH' || eventType == 'S_EVENT_BIRTH_AIRBORNE') {
        if (!pilot) {

            //Test!
            const newPilot = Pilot.create({ 
                user: null,
                userName: userName, 
                stats: [{crashs:0, deads: 0, takeOffs: 0, landings: 0, flightTime: 0, aircraftModel: aircraftModel, weaponStats: []}], 
                flightEvents: [{type:'S_JOIN_MISSION', aircraftModel: aircraftModel, date: new Date()}], 
                currentFlightEvents: [{type:'S_JOIN_MISSION', aircraftModel: aircraftModel, date: new Date()}]
            });

            await newPilot.save();
            console.log('Pilot added');

            /*new Pilot({ 
                userName: userName, 
                stats: [{crashs:0, deads: 0, takeOffs: 0, landings: 0, flightTime: 0, aircraftModel: aircraftModel, weaponStats: []}], 
                flightEvents: [{type:'S_JOIN_MISSION', aircraftModel: aircraftModel, date: new Date()}], currentFlightEvents: []
            }).save().then(() => console.log('Pilot added'));*/

            const am = await AircraftModel.findOne({name:aircraftModel}); 
            if (!am) {
                const newAircraftModel = await AircraftModel.create({name: aircraftModel});
                await newAircraftModel.save();
                console.log('Aircraft model added');
            }

            /*AircraftModel.findOne({name:aircraftModel}).then(am => {
                if (!am) new AircraftModel({name: aircraftModel}).save().then(() => console.log('Aircraft model added'));
            });*/

            return;

        } else {

            if (!pilot.user) {

            }

            let stat = pilot.stats.find(s => s.aircraftModel == aircraftModel);
            if (!stat) pilot.stats.push({crashs:0, deads: 0, takeOffs: 0, landings: 0, flightTime: 0, aircraftModel: aircraftModel, weaponStats: []});

            pilot.flightEvents.push({type:'S_JOIN_MISSION', aircraftModel: aircraftModel, date: new Date()});
            pilot.currentFlightEvents.push({type:'S_JOIN_MISSION', aircraftModel: aircraftModel, date: new Date()});

            await pilot.save();
            console.log('Pilot updated');

            return;
        }
        

    } else if (eventType == 'S_EVENT_TAKEOFF') {

        let stat = pilot.stats.find(s => s.aircraftModel == aircraftModel);
        stat.takeOffs++;

        pilot.flightEvents.push({type:'S_EVENT_TAKEOFF', aircraftModel: aircraftModel, date: new Date()});
        pilot.currentFlightEvents.push({type:'S_EVENT_TAKEOFF', aircraftModel: aircraftModel, date: new Date()});

        await pilot.save();
        console.log('Pilot updated');

        return;

    } else if (eventType == 'S_EVENT_LAND') {

        let currentDate = new Date(); 

        //Flight Time
        let currentEvents = pilot.currentFlightEvents.filter(fe => fe.aircraftModel == aircraftModel);
        let stat = pilot.stats.find(s => s.aircraftModel == aircraftModel);

        let tkEvent = currentEvents.find(e => e.type == 'S_EVENT_TAKEOFF' || e.type == 'S_EVENT_BIRTH' || e.type == 'S_EVENT_BIRTH_AIRBORNE');

        let secondsFlight = moment(currentDate).diff(moment(tkEvent.date), 'seconds');

        stat.flightTime = stat.flightTime + secondsFlight;

        //Landing count
        stat.landings++;

        pilot.currentFlightEvents = [];
        pilot.flightEvents.push({type:'S_EVENT_TAKEOFF', aircraftModel: aircraftModel, date: new Date()});
        
        await pilot.save();
        console.log('Pilot updated');

        return;
        
    } else if (eventType == 'S_EVENT_SHOT') {

        //2336,S_EVENT_SHOT,16799745,blue,AIRPLANE,FA-18C_hornet,[CETAV] - emucho,ROCKET,HYDRA-70 MK5,,,,, from 192.168.0.39:62470
//2741,S_EVENT_SHOT,16799745,blue,AIRPLANE,FA-18C_hornet,[CETAV] - emucho,BOMB,Mk-82,,,,, from 192.168.0.39:61697
//2747,S_EVENT_HIT,16799745,blue,AIRPLANE,FA-18C_hornet,[CETAV] - emucho,BOMB,Mk-82,16797697,blue,GROUND,Conventional_Circle_A,AI from 192.168.0.39:61699
//2947,S_EVENT_LAND,16799745,blue,AIRPLANE,FA-18C_hornet,[CETAV] - emucho,No Weapon,No Weapon,,,,, from 192.168.0.39:51090
//226,S_EVENT_EJECTION,16777728,blue,AIRPLANE,F-14B,AI,No Weapon,No Weapon,,,,, from 192.168.0.39:54465

        const event = {type:'S_EVENT_SHOT', aircraftModel: aircraftModel, weaponType: weaponType, weaponName: weaponName, date: new Date()};
        pilot.currentFlightEvents.push(event);
        pilot.flightEvents.push(event);

        let stat = pilot.stats.find(s => s.aircraftModel == aircraftModel);
        let weaponStat = stat.weaponStats.find(ws => ws.weaponName == weaponName && ws.weaponType == weaponType);
        if (!weaponStat) {
            weaponStat = { weaponType: weaponType, weaponName: weaponName, fireTime: 0, hitTime: 0 };
            stat.weaponStats.push(weaponStat);
        }
        weaponStat.fireTime++;

        await pilot.save();
        console.log('Pilot updated');

        return;

    } else if (eventType == 'S_EVENT_HIT') {

        const event = { type:'S_EVENT_HIT', aircraftModel: aircraftModel, weaponType: weaponType, 
            weaponName: weaponName, target: {coalition: data[10], group: data[11], name: data[12], type: data[13]}, date: new Date()};

        pilot.currentFlightEvents.push(event);
        pilot.flightEvents.push(event);

        let stat = pilot.stats.find(s => s.aircraftModel == aircraftModel);
        let weaponStat = stat.weaponStats.find(ws => ws.weaponName == weaponName && ws.weaponType == weaponType);
        if (!weaponStat) {
            weaponStat = { weaponType: weaponType, weaponName: weaponName, fireTime: 0, hitTime: 0 };
            stat.weaponStats.push(weaponStat);
        }
        weaponStat.hitTime++;

        await pilot.save();
        console.log('Pilot updated');

        return;

    } else if (eventType == 'S_EVENT_PILOT_DEAD') {

        let stat = pilot.stats.find(s => s.aircraftModel == aircraftModel);
        stat.deads++;

        pilot.currentFlightEvents = [];
        pilot.flightEvents.push({ type:'S_EVENT_PILOT_DEAD', aircraftModel: aircraftModel, date: new Date()});

        await pilot.save();
        console.log('Pilot updated');

        await Position.deleteOne({userName: userName});
        console.log('Position removed');     

        return;

    } else if (eventType == 'S_EVENT_CRASH') {

        let stat = pilot.stats.find(s => s.aircraftModel == aircraftModel);
        stat.crashs++;

        pilot.currentFlightEvents = [];
        pilot.flightEvents.push({ type:'S_EVENT_CRASH', aircraftModel: aircraftModel, date: new Date()});

        await pilot.save();
        console.log('Pilot updated');

        await Position.deleteOne({userName: userName});
        console.log('Position removed');

        return;

    } else if (eventType == 'S_EVENT_EJECTION') {

        let stat = pilot.stats.find(s => s.aircraftModel == aircraftModel);
        stat.ejections++;

        pilot.currentFlightEvents = [];
        pilot.flightEvents.push({ type:'S_EVENT_EJECTION', aircraftModel: aircraftModel, date: new Date()});

        await pilot.save();
        console.log('Pilot updated');

        await Position.deleteOne({userName: userName});
        console.log('Position removed');

        return;
    
    } else if(eventType == 'S_EVENT_PLAYER_COMMENT') {

        pilot.currentFlightEvents = [];
        pilot.flightEvents.push({ type:'S_LEAVE_MISSION', aircraftModel: aircraftModel, date: new Date()});

        await pilot.save();
        console.log('Pilot updated');

        await Position.deleteOne({userName: userName});
        console.log('Position removed');

        return;
    }

    /*if (eventType == 'S_EVENT_BIRTH') {

    } else if (eventType == 'S_EVENT_MISSION_START' || eventType == 'S_EVENT_MISSION_END') {

    } else if (eventType.eventType == 'S_EVENT_PLAYER_COMMENT') {
        //Cuando se regresa a expectadores se lanzan los 3 eventos
        //S_EVENT_PLAYER_COMMENT
        //S_EVENT_PILOT_DEAD
        //S_EVENT_DEAD

        //Cuando te estrellas 
        //S_EVENT_PILOT_DEAD
        //S_EVENT_CRASH
    }*/

});

udpserver.on('listening', () => {
    const address = udpserver.address();
    console.log('UDP Server listening on', address.address + ':' + address.port);
});

module.exports = udpserver;