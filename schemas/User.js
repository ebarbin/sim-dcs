const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    discordId: String,
    userName: String,
    email: String,
    token: String,
    created: { 
        type: Date,
        default: Date.now
    }
});
 
module.exports = mongoose.model('User', userSchema);