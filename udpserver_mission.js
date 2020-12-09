var net = require('dgram');
var moment = require('moment');

const Position = require('./models/Position');
const Pilot = require('./models/Pilot');

var udpserver = net.createSocket('udp4');

udpserver.on('error', (err) => {
    console.log('server error:\n ' + err.stack);
    udpServer.close();
});

udpserver.on('message', (msg, rinfo) => {
    console.log(msg + ' from ' + rinfo.address + ':' + rinfo.port);

    const data = msg.toString('utf-8').split(',');
    const eventType = data[1];
    const airCraftModel = data[5];
    const userName = data[6];
    const weaponType =  data[7];
    const weaponName = data[8];

    if (eventType == 'S_EVENT_MISSION_START' || eventType == 'S_EVENT_MISSION_END') {
        //Restart positions
        Position.deleteMany().then(() => {
            console.log('Map positions remove!!!');
        });
        return;
    }
    
    if (userName == 'AI') return;

    Pilot.find({userName: userName}).then((pilots) => {
        
        if (eventType == 'S_EVENT_BIRTH' || eventType == 'S_EVENT_BIRTH_AIRBORNE') {
            if (pilots.length == 0) {
                const newPilot = new Pilot({ 
                    userName: userName, 
                    stats: [{crashs:0, deads: 0, takeOffs: 0, landings: 0, flightTime: 0, airCraftModel: airCraftModel, weaponStats: []}], 
                    flightEvents: [] 
                });
                newPilot.save().then(() => console.log('Pilot added'));
                return;
            } else {
                let pilot = pilots[0];
                let stat = pilot.stats.find(s => s.airCraftModel == airCraftModel);
                if (!stat) {
                    pilot.stats.push({crashs:0, deads: 0, takeOffs: 0, landings: 0, flightTime: 0, airCraftModel: airCraftModel, weaponStats: []});
                    pilot.save().then(() => console.log('Pilot updated'));
                }
            }
        } else if (eventType == 'S_EVENT_TAKEOFF') {
            let pilot = pilots[0];
            pilot.flightEvents.push({type:'S_EVENT_TAKEOFF', airCraftModel: airCraftModel, date: new Date()});
            let stat = pilot.stats.find(s => s.airCraftModel == airCraftModel);
            stat.takeOffs++;

            pilot.save().then(() => console.log('Pilot updated'));
            return;
        } else if (eventType == 'S_EVENT_LAND') {
            let pilot = pilots[0];
            let currentDate = new Date(); 

            //Flight Time
            let events = pilot.flightEvents.filter(fe => fe.airCraftModel == airCraftModel);
            let stat = pilot.stats.find(s => s.airCraftModel == airCraftModel);

            let tkEvent = events.find(e => e.type == 'S_EVENT_TAKEOFF');
            if (tkEvent == null) {
                tkEvent = events.find(e => e.type == 'S_EVENT_BIRTH' || e.type == 'S_EVENT_BIRTH_AIRBORNE'); //Si nace en el aire no despega!
            }

            let secondsFlight = moment(currentDate).diff(moment(tkEvent.date), 'seconds');

            stat.flightTime = stat.flightTime + secondsFlight;

            //Landing count
            stat.landings++;
            pilot.flightEvents = [];
            console.log(pilot);
            pilot.save().then(() => console.log('Pilot updated'));

            return;
        } else if (eventType == 'S_EVENT_SHOT') {
            let pilot = pilots[0];

            //2336,S_EVENT_SHOT,16799745,blue,AIRPLANE,FA-18C_hornet,[CETAV] - emucho,ROCKET,HYDRA-70 MK5,,,,, from 192.168.0.39:62470
//2741,S_EVENT_SHOT,16799745,blue,AIRPLANE,FA-18C_hornet,[CETAV] - emucho,BOMB,Mk-82,,,,, from 192.168.0.39:61697
//2747,S_EVENT_HIT,16799745,blue,AIRPLANE,FA-18C_hornet,[CETAV] - emucho,BOMB,Mk-82,16797697,blue,GROUND,Conventional_Circle_A,AI from 192.168.0.39:61699
//2947,S_EVENT_LAND,16799745,blue,AIRPLANE,FA-18C_hornet,[CETAV] - emucho,No Weapon,No Weapon,,,,, from 192.168.0.39:51090
//226,S_EVENT_EJECTION,16777728,blue,AIRPLANE,F-14B,AI,No Weapon,No Weapon,,,,, from 192.168.0.39:54465

            pilot.flightEvents.push({type:'S_EVENT_SHOT', airCraftModel: airCraftModel, weaponType: weaponType, weaponName: weaponName, date: new Date()});

            let stat = pilot.stats.find(s => s.airCraftModel == airCraftModel);
            let weaponStat = stat.weaponStats.find(ws => ws.weaponName == weaponName && ws.weaponType == weaponType);
            if (!weaponStat) {
                weaponStat = { weaponType: weaponType, weaponName: weaponName, fireTime: 0, hitTime: 0 };
                stat.weaponStats.push(weaponStat);
            }
            weaponStat.fireTime++;

            pilot.save().then(() => console.log('Pilot updated'));
            return;
        } else if (eventType == 'S_EVENT_HIT') {
            let pilot = pilots[0];
            pilot.flightEvents.push({
                type:'S_EVENT_HIT', airCraftModel: airCraftModel, weaponType: weaponType, 
                weaponName: weaponName, target: {coalition: data[10], group: data[11], name: data[12], type: data[13]}, date: new Date()
            });

            let stat = pilot.stats.find(s => s.airCraftModel == airCraftModel);
            let weaponStat = stat.weaponStats.find(ws => ws.weaponName == weaponName && ws.weaponType == weaponType);
            if (!weaponStat) {
                weaponStat = { weaponType: weaponType, weaponName: weaponName, fireTime: 0, hitTime: 0 };
                stat.weaponStats.push(weaponStat);
            }
            weaponStat.hitTime++;

            pilot.save().then(() => console.log('Pilot updated'));
            return;
        } else if (eventType == 'S_EVENT_PILOT_DEAD') {
            let pilot = pilots[0];

            let stat = pilot.stats.find(s => s.airCraftModel == airCraftModel);
            stat.deads++;

            pilot.flightEvents = [];
            console.log(pilot);
            pilot.save().then(() => console.log('Pilot updated'));

            Position.deleteOne({userName: userName}).then(() => console.log('Position removed'));     

            return;
        } else if (eventType == 'S_EVENT_CRASH') {
            let pilot = pilots[0];

            let stat = pilot.stats.find(s => s.airCraftModel == airCraftModel);
            stat.crashs++;
            pilot.flightEvents = [];

            pilot.save().then(() => console.log('Pilot updated'));

            Position.deleteOne({userName: userName}).then(() => console.log('Position removed'));     

            return;

            S_EVENT_EJECTION
        } else if (eventType == 'S_EVENT_EJECTION') {
            let pilot = pilots[0];

            let stat = pilot.stats.find(s => s.airCraftModel == airCraftModel);
            stat.ejections++;
            pilot.flightEvents = [];

            pilot.save().then(() => console.log('Pilot updated'));

            Position.deleteOne({userName: userName}).then(() => console.log('Position removed'));     

            return;
        
        } else if(eventType == 'S_EVENT_PLAYER_COMMENT') {
            let pilot = pilots[0];
            pilot.flightEvents = [];
            pilot.save().then(() => console.log('Pilot updated'));

            Position.deleteOne({userName: userName}).then(() => console.log('Position removed'));            
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

});

udpserver.on('listening', () => {
    const address = udpserver.address();
    console.log('UDP Server listening on', address.address + ':' + address.port);
});

module.exports = udpserver;