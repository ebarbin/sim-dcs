const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pilotSkillSchema = new Schema({
    pilot: { type: Schema.Types.ObjectId, ref: 'Pilot' },
    skill: { type: Schema.Types.ObjectId, ref: 'Skill' },
    status: String
});
 
module.exports = mongoose.model('PilotSkill', pilotSkillSchema);