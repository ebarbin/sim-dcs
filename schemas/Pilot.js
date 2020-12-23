const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pilotSchema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    userName: {type: String},
    stats: [
        { 
            ejections: Number, crashs:Number, deads: Number, takeOffs: Number, landings: Number, flightTime: Number, aircraftModel: String, 
            weaponStats: [ { weaponType: String, weaponName: String, fireTime: Number, hitTime: Number } ]
        }
    ],
    flightEvents: [
        {
            eventType: String, aircraftModel: String, weaponType: String, weaponName: String, date: Date, target: { coalition: String, group: String, name: String, modelType: String }
        }
    ],
    currentFlightEvents : [{eventType: String, aircraftModel: String, weaponType: String, weaponName: String, date: Date}],
    created: { 
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Pilot', pilotSchema);