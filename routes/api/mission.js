const express = require('express');
const moment = require('moment');

const discordBot = require('../../discord-bot');
const MessageEmbed = require('discord.js').MessageEmbed;

const apiRestMission = express.Router();
const ObjectId = require('mongoose').Types.ObjectId; 

const Mission = require('../../schemas/Mission');

const sendMissionAlertToDiscord = (mission, req) => {

    const misionesChannel = discordBot.channels.cache.find(channel => channel.name === process.env.MIISSION_CHANNEL_ALERTS);

    const msg = mission.publish ? 'La misión se vuela el día: ' + moment(mission.date).format('D/MM/yyyy') + '. Anotate!' : 'Esta misión se ha quitado del cronograma.';
    const color = mission.publish ? '#00830b': '#c90000';

    const embed = new MessageEmbed()
        .setColor(color)
        .setTitle(mission.title + ' (aquí)')
        .setURL(mission.googleDocsLink)
        .setAuthor(mission.user.userName, mission.user.avatar)
        .setDescription(mission.description)
        .setThumbnail('http://' + req.get('host') + '/assets/images/DCS_World_logo.png')
        .addFields( { name: '@everyone', value: msg } )
        .setTimestamp()
        .setFooter('sim-dcs', 'http://' + req.get('host') + '/assets/images/DCS_World_logo.png');

    misionesChannel.send(embed);
}

apiRestMission.get('/:userId', (req, res) => {
    Mission.find({'user': new ObjectId(req.params.userId) }).then(missions => res.json(missions));
})

apiRestMission.delete('/:id', (req, res) => {
    Mission.deleteOne({_id: new ObjectId(req.params.id)}).then(() => res.json());
})

apiRestMission.put('/:id', (req, res) => {
    const data = req.body;

    Mission.findById(new ObjectId(req.params.id)).then((mission) => {

        let publishToDiscord = mission.publish != data.publish;

        mission.publish = data.publish;
        mission.title = data.title;
        mission.description = data.description;
        mission.googleDocsLink = data.googleDocsLink;
        mission.date = mission.date;

        mission.save().then((sm) => {
            
            if (publishToDiscord) {
                sm.populate('user').execPopulate().then((pm) => {
                    sendMissionAlertToDiscord(pm, req);
                    res.json();
                });
            } else {
                res.json();
            }
            
        });

    });

})

apiRestMission.post('/check-date', (req, res) => {
    const date = req.body.date;
    Mission.countDocuments({
        publish: true,
        date: { $gte: moment(date).startOf('day').toDate(), $lte: moment(date).endOf('day').toDate() }
    }).then(quantity => {
        if (quantity > 0) res.json({available: false });
        else res.json({available: true });
    })
})

apiRestMission.post('/', (req, res) => {

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
                sendMissionAlertToDiscord(pm, req);
                res.json();
            });

        } else {
            res.json();
        }

    });

});

module.exports = apiRestMission;