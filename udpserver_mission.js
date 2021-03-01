const net = require('dgram');
const udpserver = net.createSocket('udp4');

const moment = require('moment');

const Position = require('./schemas/Position');
const FlightEvent = require('./schemas/FlightEvent');
const FlightStat = require('./schemas/FlightStat');
const WeaponStat = require('./schemas/WeaponStat');
const Pilot = require('./schemas/Pilot');

const discordBot = require('./discord-bot');
const MessageEmbed = require('discord.js').MessageEmbed;

const findOrCreatePilot = userName => {
    return new Promise((resolve, reject) => {
        Pilot.findOne({userName: userName}).then((pilot) => {
            if (!pilot) new Pilot({userName: userName}).save(newPilot).then(resolve(newPilot));
            else resolve(pilot);
        });
    })
}

const serverStatusUpDiscordMessage = () => {
    
    const statusChannel = discordBot.channels.cache.find(channel => channel.name === process.env.SERVER_STATUS_CHANNEL );
    
    //Clear status channel
    statusChannel.messages.fetch().then(messages => { messages.forEach(msg => msg.delete()) });

    const embed = new MessageEmbed()
        .setTitle('Servidor en línea')
        .setColor('#00830b')
        .setTimestamp()
        .setFooter('sim-dcs', process.env.PUBLIC_URL + '/assets/images/DCS_World_logo.png');
       
       statusChannel.send(embed);
}

const serverStatusDownDiscordMessage = () => {
    
    const statusChannel = discordBot.channels.cache.find(channel => channel.name === process.env.SERVER_STATUS_CHANNEL );
    
    //Clear status channel
    statusChannel.messages.fetch().then(messages => { messages.forEach(msg => msg.delete()) });

    const embed = new MessageEmbed()
        .setTitle('Servidor fuera de línea')
        .setColor('#c90000')
        .setTimestamp()
        .setFooter('sim-dcs', process.env.PUBLIC_URL + '/assets/images/DCS_World_logo.png');
       
       statusChannel.send(embed);
}

const mainFunction = msg => {

    const data = msg.toString('utf-8').split(',');
    const eventType = data[1];
    const aircraftModel = data[5];
    const userName = data[6];
    const weaponType =  data[7];
    const weaponName = data[8];

    if (eventType == 'S_EVENT_MISSION_START') {
        serverStatusUpDiscordMessage();
        //Restart positions
        Position.deleteMany().then(() => console.log('Map positions removed!!!'));
        return;
    } else if (eventType == 'S_EVENT_MISSION_END') {
        serverStatusDownDiscordMessage();
        //Restart positions
        Position.deleteMany().then(() => console.log('Map positions removed!!!'));
        return;
    }

    if (userName == 'AI') return;

        Promise.all([findOrCreatePilot(userName)]).then(responses => {

            const pilot = responses[0];

            if (eventType == 'S_EVENT_BIRTH' || eventType == 'S_EVENT_BIRTH_AIRBORNE') {

                FlightStat.exists({pilot: pilot._id, aircraftModel: aircraftModel}).then(exist => {
                    if (!exist) new FlightStat({pilot: pilot._id, crashs:0, deads: 0, takeOffs: 0, landings: 0, flightTime: 0, ejections: 0, aircraftModel: aircraftModel}).save().then(console.log('FlightStat added'));
                });

                FlightEvent.insertMany([
                    { pilot: pilot._id, eventType:'S_JOIN_MISSION', aircraftModel: aircraftModel, date: new Date(), temp: false },
                    { pilot: pilot._id, eventType:'S_JOIN_MISSION', aircraftModel: aircraftModel, date: new Date(), temp: true }
                ]).then(console.log('FlightEvent added'));

            } else if (eventType == 'S_EVENT_TAKEOFF') {

                FlightStat.findOne({pilot: pilot._id, aircraftModel: aircraftModel}).then(stat => {
                    if (!stat) {
                        new FlightStat({pilot: pilot._id, crashs:0, deads: 0, takeOffs: 1, landings: 0, flightTime: 0, ejections: 0, aircraftModel: aircraftModel}).save().then(console.log('FlightStat added'));
                    } else {
                        stat.takeOffs++;
                        stat.save().then(console.log('FlightStat updated'));
                    }
                })

                FlightEvent.insertMany([
                    { pilot: pilot._id, eventType:'S_EVENT_TAKEOFF', aircraftModel: aircraftModel, date: new Date(), temp: false },
                    { pilot: pilot._id, eventType:'S_EVENT_TAKEOFF', aircraftModel: aircraftModel, date: new Date(), temp: true }
                ]).then();

            } else if (eventType == 'S_EVENT_LAND') {

                let currentDate = new Date(); 
                
                FlightEvent.findOne({pilot: pilot._id, aircraftModel: aircraftModel, temp: true, eventType: {$in: ['S_EVENT_TAKEOFF', 'S_EVENT_BIRTH', 'S_EVENT_BIRTH_AIRBORNE']}}).then(tkEvent => {

                    let secondsFlight = moment(currentDate).diff(moment(tkEvent.date), 'seconds');

                    FlightStat.findOne({pilot: pilot._id, aircraftModel: aircraftModel}).then(stat => {
                        if (!stat) {
                            new FlightStat({pilot: pilot, crashs:0, deads: 0, takeOffs: 0, landings: 1, flightTime: 0, ejections: 0, aircraftModel: aircraftModel}).save().then(console.log('FlightStat added'));
                        } else {
                            stat.landings++;
                            stat.flightTime = stat.flightTime + secondsFlight;
                            stat.save().then(console.log('FlightStat updated'));
                        }
                    })
                  
                    FlightEvent.deleteMany({pilot: pilot, aircraftModel: aircraftModel, temp: true}).then();
                })

                new FlightEvent({ pilot: pilot, eventType:'S_EVENT_LAND', aircraftModel: aircraftModel, date: new Date(), temp: false }).save().then();
                
            } else if (eventType == 'S_EVENT_SHOT') {

                WeaponStat.findOne({pilot: pilot, aircraftModel: aircraftModel, weaponType: weaponType, weaponName: weaponName}).then(weaponStat => {
                    if (!weaponStat) {
                        new WeaponStat({pilot: pilot, aircraftModel: aircraftModel, weaponType: weaponType, weaponName: weaponName, fireTime: 1, hitTime: 0}).save().then(console.log('FlightStat added'));
                    } else {
                        weaponStat.fireTime++;
                        weaponStat.save().then(console.log('FlightStat updated'));
                    }
                });

                FlightEvent.insertMany([
                    { eventType:'S_EVENT_SHOT', aircraftModel: aircraftModel, weaponType: weaponType, weaponName: weaponName, date: new Date(), temp: false },
                    { eventType:'S_EVENT_SHOT', aircraftModel: aircraftModel, weaponType: weaponType, weaponName: weaponName, date: new Date(), temp: true }
                ]).then();

            } else if (eventType == 'S_EVENT_HIT') {

                WeaponStat.findOne({pilot: pilot, aircraftModel: aircraftModel, weaponType: weaponType, weaponName: weaponName}).then(weaponStat => {
                    if (!weaponStat) {
                        new WeaponStat({pilot: pilot._id, aircraftModel: aircraftModel, weaponType: weaponType, weaponName: weaponName, fireTime: 0, hitTime: 1}).save().then(console.log('FlightStat added'));
                    } else {
                        weaponStat.hitTime++;
                        weaponStat.save().then(console.log('FlightStat updated'));
                    }
                })

                FlightEvent.insertMany([
                    { eventType:'S_EVENT_HIT', aircraftModel: aircraftModel, weaponType: weaponType, 
                        weaponName: weaponName, target: {coalition: data[10], group: data[11], name: data[12], modelType: data[13]}, date: new Date(), temp: false },
                    { eventType:'S_EVENT_HIT', aircraftModel: aircraftModel, weaponType: weaponType, 
                        weaponName: weaponName, target: {coalition: data[10], group: data[11], name: data[12], modelType: data[13]}, date: new Date(), temp: true },
                ]).then();

            } else if (eventType == 'S_EVENT_PILOT_DEAD') {

                FlightStat.findOne({pilot: pilot._id, aircraftModel: aircraftModel}).then(stat => {
                    if (!stat) {
                        new FlightStat({pilot: pilot._id, crashs:0, deads: 1, takeOffs: 0, landings: 0, flightTime: 0, ejections: 0, aircraftModel: aircraftModel}).save().then(console.log('FlightStat added'));
                    } else {
                        stat.deads++;
                        stat.save().then(console.log('FlightStat updated'));
                    }
                });

                new FlightEvent({ pilot: pilot._id, eventType:'S_EVENT_PILOT_DEAD', aircraftModel: aircraftModel, date: new Date(), temp: false }).save().then();
                FlightEvent.deleteMany({pilot: pilot._id, aircraftModel: aircraftModel, temp: true}).then();

                Position.deleteMany({userName: userName}).then();

            } else if (eventType == 'S_EVENT_CRASH') {

                FlightStat.findOne({pilot: pilot._id, aircraftModel: aircraftModel}).then(stat => {
                    if (!stat) {
                        new FlightStat({pilot: pilot._id, crashs:1, deads: 0, takeOffs: 0, landings: 0, flightTime: 0, ejections: 0, aircraftModel: aircraftModel}).save().then(console.log('FlightStat added'));
                    } else {
                        stat.crashs++;
                        stat.save().then(console.log('FlightStat updated'));
                    }
                });

                new FlightEvent({ pilot: pilot._id, eventType:'S_EVENT_CRASH', aircraftModel: aircraftModel, date: new Date(), temp: false }).save().then();
                FlightEvent.deleteMany({pilot: pilot._id, aircraftModel: aircraftModel, temp: true}).then();

                Position.deleteMany({userName: userName}).then();

            } else if (eventType == 'S_EVENT_EJECTION') {

                FlightStat.findOne({pilot: pilot._id, aircraftModel: aircraftModel}).then(stat => {
                    if (!stat) {
                        new FlightStat({pilot: pilot._id, crashs:0, deads: 0, takeOffs: 0, landings: 0, flightTime: 0, ejections: 1, aircraftModel: aircraftModel}).save().then(console.log('FlightStat added'));
                    } else {
                        stat.ejections++;
                        stat.save().then(console.log('FlightStat updated'));
                    }
                });

                new FlightEvent({ pilot: pilot._id, eventType:'S_EVENT_EJECTION', aircraftModel: aircraftModel, date: new Date(), temp: false }).save().then();
                FlightEvent.deleteMany({pilot: pilot._id, aircraftModel: aircraftModel, temp: true}).then();

                Position.deleteMany({userName: userName}).then();
            
            } else if(eventType == 'S_EVENT_PLAYER_COMMENT') {

                new FlightEvent({ pilot: pilot._id, eventType:'S_LEAVE_MISSION', aircraftModel: aircraftModel, date: new Date(), temp: false }).save().then();
                FlightEvent.deleteMany({pilot: pilot._id, aircraftModel: aircraftModel, temp: true}).then();

                Position.deleteMany({userName: userName}).then();
            }

        });
} 

const missionEventListener = (msg, rinfo) => {
    setTimeout(() => mainFunction(msg), 1000);
}

udpserver.on('message', missionEventListener);

udpserver.on('listening', () => {
    const address = udpserver.address();
    console.log('Mission UDP Server listening on', address.address + ':' + address.port + '.');
});

udpserver.on('error', (err) => {
    console.log('server error:\n ' + err.stack);
    udpServer.close();
});

module.exports = udpserver;