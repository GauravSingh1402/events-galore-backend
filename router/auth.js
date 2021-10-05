const express=require('express');
const router=express.Router();
var mongodb=require('mongodb');
var assert = require('assert');

require('../db/conn');
const  Event=require('../model/eventSchema');
const { mongo } = require('mongoose');

router.get('/', (req,res)=> {
    res.send('HELLO THERE from auth');

});


router.post('/createv', async (req,res)=>{
    const  { title, description, cost, venue, eventspeaker, contact, tags, ispaid, isoffline, link, isfeatured, date, time}=req.body;
  
    if( !title)
    {
        return res.status(422).json({ error:"fill the title"});
    }
    if( !description)
    {
        return res.status(422).json({ error:"fill the description"});
    }
    if( !eventspeaker)
    {
        return res.status(422).json({ error:"fill the fields"});
    }
    if( !contact)
    {
        return res.status(422).json({ error:"fill the contact"});
    }
    if( !tags)
    {
        console.log("enter tag")
    }
    if( !ispaid)
    {
        console.log("enter paid")
    }
    if( !isoffline)
    {
        console.log("enter offline");
    }
    if( !isfeatured)
    {
        console.log('enter featured');
    }
    if( !date)
    {
        console.log("enter date");
    }
    if( !time)
    {
        console.log('enter time');
    }
    
    
       
    const cevent=new Event({ title, description, cost, venue, eventspeaker, contact, tags, ispaid, isoffline, isfeatured,link, date, time});
    cevent.save().then(() =>
    {
        console.log('ZA WARUDO')
    }).catch((err) =>
       console.log(err));
    
    
});

router.get('/event',function(req,res,next){
        var created_events=[]
        const url = 'mongodb://localhost:27017/';
        MongoClient.connect(url).then((client) => {
  
            const connect = client.db(events_galore);
          
            // Connect to collection
            const collection = connect
                    .collection("events");
          
            // Fetching the records having 
            // name as saini
            collection.find()
                .toArray().then((ans) => {
                    console.log(ans);
                });
        }).catch((err) => {
          
            // Printing the error message
            console.log(err.Message);
        })
        
});

module.exports=router;