const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightEventSchema = new Schema({
    pilot: { type: Schema.Types.ObjectId, ref: 'Pilot' },
    eventType: String, 
    aircraftModel: String, 
    weaponType: String, 
    weaponName: String, 
    date: Date, 
    temp: Boolean,
    target: { coalition: String, group: String, name: String, modelType: String },
    created: { 
        type: Date,
        default: Date.now
    }
});
 
module.exports = mongoose.model('FlightEvent', flightEventSchema);