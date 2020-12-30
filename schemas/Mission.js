const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const missionSchema = new Schema({
    title: String,
    description: String,
    googleDocsLink: String,
    date: Date,
    publish: Boolean,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    created: { 
        type: Date,
        default: Date.now
    }
});
 
module.exports = mongoose.model('Mission', missionSchema);