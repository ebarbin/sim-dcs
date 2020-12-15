const express = require('express');
const router = express.Router();

function isAuthorized (req, res, next) {
  if (req.user) next();
  else res.redirect('/auth');
};

router.get('/sim-dcs/home', isAuthorized, (req, res) => {
  res.sendFile(process.cwd()+"/app/dist/sim-dcs/index.html");
});

router.get('/', isAuthorized, (req, res) => {
  res.render('access', {user: req.user});
});

router.get('/forbidden', (req, res) => {
  res.render('forbidden');
});

module.exports = router;