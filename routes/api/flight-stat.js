const express = require('express');
const moment = require('moment');
const _ = require('lodash');

const apiRestFlightStat = express.Router();
const ObjectId = require('mongoose').Types.ObjectId; 

const FlightStat = require('../../schemas/FlightStat');

apiRestFlightStat.get('/:pilotId', (req, res) => {

    const pilotId = req.params.pilotId;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const response = {};

    let elements = [];
    FlightStat.find({pilot: new ObjectId(pilotId)}).then((stats) => {

        const totStat = { aircraftModel:'Totales', flightTime: 0, takeOffs: 0, landings: 0, deads: 0, crashs: 0, ejects: 0 };

        elements = [...stats];

        stats.forEach(s => {
            totStat.flightTime += s.flightTime;
            totStat.takeOffs += s.takeOffs;
            totStat.landings += s.landings;
            totStat.deads += s.deads;
            totStat.crashs += s.crashs;
            totStat.ejects += s.ejects;
        });

        elements.unshift(totStat);

        response.length = elements.length;
        response.datasource = elements.slice(page * limit, (page * limit) + limit);

        res.json(response);
    });
})


module.exports = apiRestFlightStat;