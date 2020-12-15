const express = require('express');
const router = express.Router();

function isAuthorized (req, res, next) {
  if (req.user) next();
  else res.redirect('/auth');
};

router.get('/', isAuthorized, (req, res) => {
  res.setHeader('token', req.user.token);
  res.sendFile(process.cwd()+"/app/dist/sim-dcs/index.html")
});

module.exports = router;