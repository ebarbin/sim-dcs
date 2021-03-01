require('dotenv').config();

const udp = require('dgram');
const client = udp.createSocket('udp4');
const data = Buffer.from('0,S_EVENT_MISSION_START');

client.send(data, 9182,'localhost',function(error){
    client.close();
});