const express = require('express');
const moment = require('moment');
const _ = require('lodash');

const apiRestFlightEvent = express.Router();
const ObjectId = require('mongoose').Types.ObjectId; 

const FlightEvent = require('../../schemas/FlightEvent');

const Skill = require('../../schemas/Skill');
const PilotSkill = require('../../schemas/PilotSkill');

monthName = fe => moment(fe.date, 'YYYY-MM-DD').format('DD/MM/yyyy');

apiRestFlightEvent.get('/:pilotId', (req, res) => {

    const pilotId = req.params.pilotId;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const response = {};

    const elements = [];
    FlightEvent.find({pilot: new ObjectId(pilotId), temp: false}).then((events) => {

        const result = _.groupBy(events, monthName);
        for (const prop in result) {
            elements.unshift({
              date: moment(prop, 'DD/MM/yyyy').toDate(), 
              events: result[prop].map(el => { el.date = moment(el.date).toDate(); return el; })
            });
        }

        response.length = elements.length;
        response.datasource = elements.slice(page * limit, (page * limit) + limit);

        res.json(response);
    });
})

apiRestFlightEvent.get('/count/:pilotId', (req, res) => {

    const pilotId = req.params.pilotId;

    FlightEvent.countDocuments({pilot: new ObjectId(pilotId), temp: false}).then((val) => {
        res.json({value:val});
    });
})

module.exports = apiRestFlightEvent;