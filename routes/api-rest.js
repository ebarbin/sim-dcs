const express = require('express');
const apiRest = express.Router();

const Position = require('../schemas/Position');
const Pilot = require('../schemas/Pilot');

apiRest.get('/positions', (req, res) => {
    Position.find().then((positions) => {
        res.json(positions);
    })
});

apiRest.get('/pilots', (req, res) => {
    Pilot.find().then((positions) => {
        res.json(positions);
    });
})

apiRest.get('/auth/check/:token', (req, res) => {
    console.log(req.params.token);
})


module.exports = apiRest;