const mongoose = require('mongoose');



const eventSchema= new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    description: {type:String,required:true},
    cost:{type:String},
    venue: {type:String},
    eventspeaker: {type:String},
    contact:{type:String, required:true},
    tags:
        {
            type:String,
        },
    ispaid:{type:String, required:true},
    isoffline:{type:String, required:true},
    isfeatured:{type:String, required:true},
    link:{type:String},
    date: {type:String, required:true},
    time: {type:String, required:true},


})


const Event=mongoose.model('EVENT',eventSchema);

module.exports=Event;