require('dotenv').config();

const express = require('express');
const path = require('path');
const db = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const discordstrategy = require('./strategies/discordstrategy');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(process.cwd() + "/app/dist/"));
app.use(express.static('./public'));

app.set('view engine', 'ejs');

app.use(session({
  secret: 'some random secret',
  proxy: true,
  cookie: { maxAge: 60000 * 60 * 40 },
  saveUninitialized: false,
  name: 'discord-oauth'
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./routes/api-rest'));
app.use('/auth', require('./routes/auth'));
app.use(require('./routes/router'));

//Database connection
db.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Database ' + process.env.MONGO_DB_URL + ' connected.'));

//Socket connection
require('./udpserver_position').bind(process.env.UDPSERVER_POSITION_PORT);
//Socket connection
require('./udpserver_mission').bind(process.env.UDPSERVER_MISSION_PORT);

//Discord connection
require('./discord-bot');

//Webserver connection
app.listen(process.env.WEBSERVER_PORT,'0.0.0.0', () => { console.log('Server listening on the port ' + process.env.WEBSERVER_PORT +'.') });