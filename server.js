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

//app.listen(WEBSERVER_PORT,'0.0.0.0', () => { console.log('Server listening on the port ' + WEBSERVER_PORT) });

mongoose.connect('mongodb://localhost:27017/sim-dcs', { useNewUrlParser: true, useUnifiedTopology: true }).then(() =>{
  app.listen(WEBSERVER_PORT,'0.0.0.0', () => { console.log('Server listening on the port ' + WEBSERVER_PORT) });
}).catch(err => {
  console.log(err);
});

