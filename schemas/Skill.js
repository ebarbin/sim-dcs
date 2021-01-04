const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema({
    name: String,
    parent: { type: Schema.Types.ObjectId, ref: 'Skill' }
});
 
module.exports = mongoose.model('Skill', skillSchema);