const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');

const OAuthClient = require('discord-oauth2');
const oauthClient = new OAuthClient(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_CLIENT_SECRET);

/*router.get('/sim-dcs/auth/redirect', (req, res) => {
  console.log(req.query.code);
  res.sendFile(process.cwd()+"/app/dist/sim-dcs/index.html")
});*/

router.get('/', passport.authenticate('discord'));

router.get('/sim-dcs/auth/redirect', passport.authenticate('discord', {
  failureRedirect:'/forbidden'
}), (req, res) => {
  console.log('llega aca???')
  res.sendFile(process.cwd()+"/app/dist/sim-dcs/index.html")
});
/*
router.get('/', (req, res) => {
  const redirect = encodeURIComponent('http://localhost:3080/sim-dcs/auth/redirect');
  res.redirect('https://discordapp.com/api/oauth2/authorize?client_id='+process.env.DISCORD_CLIENT_ID+'&scope=identify&response_type=code&redirect_uri='+redirect);
});
*/
module.exports = router;