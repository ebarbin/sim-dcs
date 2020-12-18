const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    discordId: String,
    userName: String,
    email: String,
    token: String,
    pilot: { type: Schema.Types.ObjectId, ref: 'Pilot' },
    created: { 
        type: Date,
        default: Date.now
    }
});
 
module.exports = mongoose.model('User', userSchema);