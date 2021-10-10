const mongoose = require('mongoose');



const eventSchema= new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    image: {
        type: String,required: true
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
    no_of_users:{type:Number}


})


const Event=mongoose.model('EVENT',eventSchema);

module.exports=Event;