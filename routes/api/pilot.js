const express = require('express');
const moment = require('moment');

const apiRestPilot = express.Router();
const ObjectId = require('mongoose').Types.ObjectId; 

const Pilot = require('../../schemas/Pilot');

const Skill = require('../../schemas/Skill');
const PilotSkill = require('../../schemas/PilotSkill');

apiRestPilot.get('/', (req, res) => {
    Pilot.find().then((positions) => {
        res.json(positions);
    });
})

apiRestPilot.get('/:id', (req, res) => {
    Pilot.findById(new ObjectId(req.params.id)).then((pil) => {
        res.json(pil);
    });
})


apiRestPilot.get('/:id/skill', (req, res) => {
    PilotSkill.find({pilot: new ObjectId(req.params.id)}).then(skills => res.json(skills));
})

apiRestPilot.post('/:id/skill', (req, res) => {
    const pilot = req.params.id;
    const skill = req.body.skill;
    const status = req.body.status;

    new PilotSkill({  pilot: pilot,  skill: skill, status: status }).save().then((ps) => {
        res.json(ps);
    });
})

apiRestPilot.post('/:id/skill/all', (req, res) => {
    const pilot = req.params.id;
    const status = req.body.status;

    Skill.findById(new ObjectId(req.body.skill)).then(parent => {

        
        Skill.find({parent: new ObjectId(req.body.skill)}).then(skills => {

            skills.push(parent);
            const objects = skills.map(childId => { return {  pilot: pilot,  skill: childId, status: status } });

            PilotSkill.insertMany(objects).then(saved => { 
                saved.forEach(s => s.skill = s.skill._id);
                res.json(saved);
            });
    
        });

    })

})

apiRestPilot.delete('/:id/skill/:skill/all', (req, res) => {
    Skill.find({parent: new ObjectId(req.params.skill)}).then(skills => {

        const skillsId = skills.map(s => s._id);
        skillsId.push(req.params.skill);

        PilotSkill.find({pilot: new ObjectId(req.params.id), skill: {$in: skillsId} }).then((deleted) => {
            PilotSkill.deleteMany({pilot: new ObjectId(req.params.id), skill: {$in: skillsId} }).then(() => res.json(deleted));
        });        
    });
})

apiRestPilot.delete('/:id/skill/:skill', (req, res) => {
    PilotSkill.findOne({pilot: new ObjectId(req.params.id), skill: new ObjectId(req.params.skill)}).then(ps => {
        PilotSkill.deleteOne({pilot: new ObjectId(req.params.id), skill: new ObjectId(req.params.skill)}).then(() => res.json(ps));
    })
})

module.exports = apiRestPilot;