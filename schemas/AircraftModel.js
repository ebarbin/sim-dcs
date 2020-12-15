const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aircraftModelSchema = new Schema({
    name: String,
    created: { 
        type: Date,
        default: Date.now
    }
});
 
module.exports = mongoose.model('AircraftModel', aircraftModelSchema);