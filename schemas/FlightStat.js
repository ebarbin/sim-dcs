const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightStatSchema = new Schema({
    pilot: { type: Schema.Types.ObjectId, ref: 'Pilot' },
    aircraftModel: String,
    ejections: Number, 
    crashs:Number, 
    deads: Number, 
    takeOffs: Number, 
    landings: Number, 
    flightTime: Number, 
    created: { 
        type: Date,
        default: Date.now
    }
});
 
module.exports = mongoose.model('FlightStat', flightStatSchema);