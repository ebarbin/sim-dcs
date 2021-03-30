const dgram = require('dgram');

const client = dgram.createSocket('udp4');

client.send('Hello3World!', 9182, '192.168.0.145', function(err, bytes) {
    console.log(err);
    client.close();
});