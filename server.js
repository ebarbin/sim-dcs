const express = require('express');
const bodyParser = require("body-parser");

const Position = require('./models/Position');

const app = express();
 
const WEBSERVER_PORT = 3080;
const UDPSERVER_POSITION_PORT = 9181;
const UDPSERVER_MISSION_PORT = 9182;

const udpserver_position = require('./udpserver_position');
const udpserver_mission = require('./udpserver_mission');

udpserver_position.bind(UDPSERVER_POSITION_PORT);
udpserver_mission.bind(UDPSERVER_MISSION_PORT);

app.use(bodyParser.json());
app.use(express.static(process.cwd()+"/app/dist/sim-dcs/"));

app.get('/api/positions', (req, res) => {
  Position.find().then((positions) => {
    res.json(positions);
  })
});

app.get('/*', (req,res) => {
  res.sendFile(process.cwd()+"/app/dist/sim-dcs/index.html")
});

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.channel.send('pong');
  }
});

client.login('Nzg2Mjg5MDUxNjk0MTM3MzQ1.X9EOvg.pbp1Gy4TwyuolLkHSLz3xx4N1mM').then((data)=>{
  console.log(data);
})
console.log(client.channels.cache.get("444337434176520193"));
app.listen(WEBSERVER_PORT,'0.0.0.0', () => { console.log('Server listening on the port ' + WEBSERVER_PORT) });

/*mongoose.connect('mongodb://localhost:27017/sim-dcs', { useNewUrlParser: true, useUnifiedTopology: true }).then(() =>{
  app.listen(WEBSERVER_PORT,'0.0.0.0', () => { console.log('Server listening on the port ' + WEBSERVER_PORT) });
}).catch(err => {
  console.log(err);
});*/

