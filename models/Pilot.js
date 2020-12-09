const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pilotSchema = new Schema({
    userName: String,
    stats: [
        { 
            ejections: Number, crashs:Number, deads: Number, takeOffs: Number, landings: Number, flightTime: Number, airCraftModel: String, 
            weaponStats: [ { weaponType: String, weaponName: String, fireTime: Number, hitTime: Number } ]
        }
    ],
    flightEvents : [{type: String, airCraftModel: String, weaponType: String, weaponName: String, date: Date}],
    created: { 
        type: Date,
        default: Date.now
    }
});
 
module.exports = mongoose.model('Pilot', pilotSchema);