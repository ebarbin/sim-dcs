const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weaponStatSchema = new Schema({
    pilot: { type: Schema.Types.ObjectId, ref: 'Pilot' },
    aircraftModel: String,
    weaponType: String, 
    weaponName: String, 
    fireTime: Number, 
    hitTime: Number,
    created: { 
        type: Date,
        default: Date.now
    }
});
 
module.exports = mongoose.model('WeaponStat', weaponStatSchema);