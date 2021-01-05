const express = require('express');

const apiRestCommon = express.Router();

const Position = require('../../schemas/Position');
const Skill = require('../../schemas/Skill');

apiRestCommon.get('/positions', (req, res) => {
    Position.find().then((positions) => {
        res.json(positions);
    })
});

apiRestCommon.get('/auth/check/:token', (req, res) => {
    console.log(req.params.token);
})

apiRestCommon.get('/skill', (req, res) => {
    const query = {};

    if (req.query.parent) query.parent = req.query.parent;
    else query.parent = {$exists: false};

    Skill.find(query).then(skills => res.json(skills));
})

module.exports = apiRestCommon;