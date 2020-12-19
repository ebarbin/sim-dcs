const express = require('express');
const apiRest = express.Router();
const ObjectId = require('mongoose').Types.ObjectId; 

const Position = require('../schemas/Position');
const Pilot = require('../schemas/Pilot');

apiRest.get('/positions', (req, res) => {
    Position.find().then((positions) => {
        res.json(positions);
    })
});

apiRest.get('/pilot', (req, res) => {
    Pilot.find().then((positions) => {
        res.json(positions);
    });
})

apiRest.get('/pilot/:id', (req, res) => {
    Pilot.findOne({_id: new ObjectId(req.params.id)}).then((pil) => {
        res.json(pil);
    });
})

apiRest.get('/auth/check/:token', (req, res) => {
    console.log(req.params.token);
})


module.exports = apiRest;