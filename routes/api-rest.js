const express = require('express');
const moment = require('moment');

const discordBot = require('../discord-bot');
const MessageEmbed = require('discord.js').MessageEmbed;

const apiRest = express.Router();
const ObjectId = require('mongoose').Types.ObjectId; 

const Position = require('../schemas/Position');
const Pilot = require('../schemas/Pilot');
const Mission = require('../schemas/Mission');
const Skill = require('../schemas/Skill');
const PilotSkill = require('../schemas/PilotSkill');

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
    Pilot.findById(new ObjectId(req.params.id)).then((pil) => {
        res.json(pil);
    });
})

apiRest.get('/auth/check/:token', (req, res) => {
    console.log(req.params.token);
})

apiRest.get('/mission/:userId', (req, res) => {
    Mission.find({'user': new ObjectId(req.params.userId) }).then(missions => res.json(missions));
})

apiRest.get('/skill', (req, res) => {
    const query = {};

    if (req.query.parent) query.parent = req.query.parent;
    else query.parent = {$exists: false};

    Skill.find(query).then(skills => res.json(skills));
})

apiRest.get('/pilot/:id/skill', (req, res) => {
    PilotSkill.find({pilot: new ObjectId(req.params.id)}).then(skills => res.json(skills));
})

apiRest.post('/pilot/:id/skill', (req, res) => {
    const pilot = req.params.id;
    const skill = req.body.skill;
    const status = req.body.status;

    new PilotSkill({  pilot: pilot,  skill: skill, status: status }).save().then((ps) => {
        res.json(ps);
    });
})


apiRest.post('/pilot/:id/skill/all', (req, res) => {
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

apiRest.delete('/pilot/:id/skill/:skill/all', (req, res) => {
    Skill.find({parent: new ObjectId(req.params.skill)}).then(skills => {

        const skillsId = skills.map(s => s._id);
        skillsId.push(req.params.skill);

        PilotSkill.find({pilot: new ObjectId(req.params.id), skill: {$in: skillsId} }).then((deleted) => {
            PilotSkill.deleteMany({pilot: new ObjectId(req.params.id), skill: {$in: skillsId} }).then(() => res.json(deleted));
        });        
    });
})

apiRest.delete('/pilot/:id/skill/:skill', (req, res) => {
    PilotSkill.findOne({pilot: new ObjectId(req.params.id), skill: new ObjectId(req.params.skill)}).then(ps => {
        PilotSkill.deleteOne({pilot: new ObjectId(req.params.id), skill: new ObjectId(req.params.skill)}).then(() => res.json(ps));
    })
})

apiRest.delete('/mission/:id', (req, res) => {
    Mission.deleteOne({_id: new ObjectId(req.params.id)}).then(() => res.json());
})

apiRest.put('/mission/:id', (req, res) => {
    const data = req.body;

    Mission.findById(new ObjectId(req.params.id)).then((mission) => {

        console.log('current: ' + mission.publish);
        console.log('new: ' + data.publish);

        let publishToDiscord = mission.publish != data.publish;

        mission.publish = data.publish;
        mission.title = data.title;
        mission.description = data.description;
        mission.googleDocsLink = data.googleDocsLink;
        mission.date = mission.date;

        mission.save().then((sm) => {
            
            if (publishToDiscord) {
                sm.populate('user').execPopulate().then((pm) => {
                    sentMissionAlertToDiscord(pm, req);
                    res.json();
                });
            } else {
                res.json();
            }
            
        });

    });

})

apiRest.post('/mission/check-date', (req, res) => {
    const date = req.body.date;
    Mission.countDocuments({
        publish: true,
        date: { $gte: moment(date).startOf('day').toDate(), $lte: moment(date).endOf('day').toDate() }
    }).then(quantity => {
        if (quantity > 0) res.json({available: false });
        res.json({available: true });
    })
})

apiRest.post('/mission', (req, res) => {

    const data = req.body;
    const publish = data.publish ? data.publish : false;

    new Mission({ 
        title: data.title, 
        description: data.description,
        date: data.date ? data.date : null,
        googleDocsLink: data.googleDocsLink,
        publish: publish,
        user: data.userId
    }).save().then((mission) => {

        if (publish) {
            mission.populate('user').execPopulate().then((pm) => {
                sentMissionAlertToDiscord(pm, req);
                res.json();
            });

        } else {
            res.json();
        }

    });

});

sentMissionAlertToDiscord = (mission, req) => {
    const misionesChannel = discordBot.channels.cache.find(channel => channel.name === process.env.MIISSION_CHANNEL_ALERTS);
    
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(mission.title + ' (aquí)')
        .setURL(mission.googleDocsLink)
        .setAuthor(mission.user.userName, mission.user.avatar)
        .setDescription(mission.description)
        .setThumbnail('http://' + req.get('host') + '/assets/images/DCS_World_logo.png')
        .addFields( { name: '@everyone', value: 'La misión se vuela el día: ' + moment(mission.date).format('D/MM/yyyy') + '. Anotate!' } )
        .setTimestamp()
        .setFooter('sim-dcs', 'http://' + req.get('host') + '/assets/images/DCS_World_logo.png');

    misionesChannel.send(embed);
}

module.exports = apiRest;