const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    key: String,
    eventType: String,
    coalition: String,
    flightType: String,
    flightModel: String,
    pilot: String,
    lat: Number,
    lng: Number,
    host: String,
    created: { 
        type: Date,
        default: Date.now
    }
});
 
module.exports = mongoose.model('Event', eventSchema);