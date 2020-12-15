const express = require('express');
const auth = express.Router();
const passport = require('passport');

auth.get('/', passport.authenticate('discord'));

auth.get('/logout', (req, res) => {
  if (req.user) {
    req.logOut();
    res.redirect('/');
  } else {
    res.redirect('/');
  }
});

auth.get('/redirect', passport.authenticate('discord', {
  failureRedirect:'/forbidden',
  successRedirect: '/'
}));

module.exports = auth;