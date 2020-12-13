require('dotenv').config();

const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const discordstrategy = require('./strategies/discordstrategy');

const app = express();

require('./udpserver_position').bind(process.env.UDPSERVER_POSITION_PORT);
require('./udpserver_mission').bind(process.env.UDPSERVER_MISSION_PORT);

app.use(require('./routes/router'));
app.use(require('./routes/api-rest'));

app.use(session({
  secret: 'some random secret',
  cookie: { maxAge: 60000* 60 *40 },
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(express.static(process.cwd()+"/app/dist/sim-dcs/"));

const OAuthClient = require('discord-oauth2');
const oauthClient = new OAuthClient(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_CLIENT_SECRET);

//app.listen(WEBSERVER_PORT,'0.0.0.0', () => { console.log('Server listening on the port ' + WEBSERVER_PORT) });

mongoose.connect('mongodb://localhost:27017/sim-dcs', { useNewUrlParser: true, useUnifiedTopology: true }).then(() =>{
  app.listen(process.env.WEBSERVER_PORT,'0.0.0.0', () => { console.log('Server listening on the port ' + process.env.WEBSERVER_PORT) });
}).catch(err => {
  console.log(err);
});

//const OAuthClient = require('discord-oauth2');

//let oauthClient = new OAuthClient(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_CLIENT_SECRET);
//console.log(oauthClient);
//786289051694137345
//FbyJiM7omS2g4dBJVGtxulQ2jw7KMeDs
/*const Discord = require('discord.js');
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
console.log(client.channels.cache.get("444337434176520193"));*/