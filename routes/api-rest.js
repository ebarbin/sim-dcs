const express = require('express');
const apiRest = express.Router();

const Position = require('../models/Position');
const Pilot = require('../models/Pilot');

apiRest.get('/api/positions', (req, res) => {
    Position.find().then((positions) => {
        res.json(positions);
    })
});

apiRest.get('/api/pilots', (req,res) => {
    Pilot.find().then((positions) => {
        res.json(positions);
    });
})

module.exports = apiRest;