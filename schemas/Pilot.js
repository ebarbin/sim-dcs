const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pilotSchema = new Schema({
    userName: {type: String},
    created: { 
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Pilot', pilotSchema);