const net = require('dgram');
const udpserver = net.createSocket('udp4');

const Position = require('./schemas/Position');

const mainFunction = msg => {

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

    Position.findOne({key: newPosition.key}).then((position) => {

        if (!position) {

            Position.deleteMany({userName: newPosition.userName}).then(() => {
                newPosition.save().then(result => console.log('Position added for: ' + newPosition.userName)).catch(err => console.log(err));
            });
            
        } else {

            position.lat = newPosition.lat;
            position.lng = newPosition.lng;
            position.altitude = newPosition.altitude;
            position.heading = newPosition.heading;
            position.save().then(result => console.log('Position updated for: ' + newPosition.userName)).catch(err => console.log(err));
            
        }
    })
};

const missionEventListener = (msg, rinfo) => {

    setTimeout(() => mainFunction(msg), 1000);
}

udpserver.on('message', missionEventListener);

udpserver.on('listening', () => {
    const address = udpserver.address();
    console.log('Position UDP Server listening on', address.address + ':' + address.port + '.');
});

udpserver.on('error', (err) => {
    console.log('server error:\n ' + err.stack);
    udpServer.close();
});

module.exports = udpserver;