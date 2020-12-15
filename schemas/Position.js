const mongoose = require('mongoose');
const Schema = mongoose.Schema;


    //0 CurrentTime
    //1 Id
    //2 CoalitionID (1 is rojo, 2 is azul)
    //3 Group Name
    //4 Human Flag (true is human, false is ia)
    //5 Heading 
    //6 Aircraft model
    //7 User name
    //8 Long
    //9 Lat
    //10 alt

const positionSchema = new Schema({
    currentTime: String,
    key: String,
    coalitionId: String,
    groupName: String,
    isHuman: Boolean,
    heading: String,
    aircraftModel: String,
    userName: String,
    lat: Number,
    lng: Number,
    altitude: Number,
    created: { 
        type: Date,
        default: Date.now
    }
});
 
module.exports = mongoose.model('Position', positionSchema);