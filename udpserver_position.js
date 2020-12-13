var net = require('dgram');
const mongoose = require('mongoose');
const Position = require('./models/Position');

var udpserver = net.createSocket('udp4');

udpserver.on('error', (err) => {
    console.log('server error:\n ' + err.stack);
    udpServer.close();
});

udpserver.on('message', (msg, rinfo) => {
    //console.log(msg + ' from ' + rinfo.address + ':' + rinfo.port);

    //0 CurrentTime
    //1 Id
    //2 CoalitionID (1 is rojo, 2 is azul)
    //3 Group Name
    //4 Human Flag (true is human, false is ia)
    //5 Heading 
    //6 Aircraft model
    //7 User name
    //8 Long
    //9 Lat
    //10 alt

    const data = msg.toString('utf-8').split(',');

    let heading = data[5];
    if (heading < 0) heading = heading + 2 * Math.PI;
    else heading = heading * 180 / Math.PI;

    const newPosition = new Position({
        currentTime: data[0],
        key: data[1],
        coalitionId: data[2],
        groupName: data[3],
        isHuman: data[4],
        heading: Math.trunc(Math.round(heading)),
        aircraftModel: data[6],
        userName: data[7],
        lat: data[9],
        lng: data[8],
        altitude: Math.round(data[10] * 3.28084),
    });

    Position.find({key: newPosition.key}).then((positions) => {
        const lastPosition = positions[0];
        if (positions.length == 0) {

            Position.deleteMany({userName: newPosition.userName}).then(() => {
                newPosition.save().then(result => console.log('Position added')).catch(err => console.log(err));
            });
            
        } else {

            lastPosition.lat = newPosition.lat;
            lastPosition.lng = newPosition.lng;
            lastPosition.altitude = newPosition.altitude;
            lastPosition.heading = newPosition.heading;
            lastPosition.save().then(result => console.log('Position updated')).catch(err => console.log(err));
            
        }
    })

});

udpserver.on('listening', () => {
    const address = udpserver.address();
    console.log('UDP Server listening on', address.address + ':' + address.port);
});

module.exports = udpserver;