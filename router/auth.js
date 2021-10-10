const express=require('express');
const router=express.Router();
var MongoClient=require('mongodb').MongoClient;
const app= express();


const db='mongodb+srv://eventgalore:eventgalore@cluster0.kz4zp.mongodb.net/events_galore?retryWrites=true&w=majority'
const  Event=require('../model/eventSchema');


router.get('/', (req,res)=> {
    res.send('HELLO THERE from auth');

});




router.post('/createv', async (req,res)=>{
    const  { title, description, image, cost, venue, eventspeaker, contact, tags, ispaid, isoffline, link, isfeatured, date, time, no_of_users}=req.body;
  
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
    
    
       
    const cevent=new Event({ title, description, image, cost, venue, eventspeaker, contact, tags, ispaid, isoffline, isfeatured,link, date, time, no_of_users});
    cevent.save().then(() =>
    {
        console.log('ZA WARUDO')
    }).catch((err) =>
       console.log(err));
    
    
});

router.get('/event', (req,res)=> {
    
    MongoClient.connect(db, function(err, client) {
        var db=client.db('events_galore');
        if (err) throw err;
        db.collection("events").find({isfeatured:"yes"}).toArray((err, result)=> {
        if (err) throw err;
        res.send(result)
        });
    });
});



router.get('/date', (req,res)=> {
    
    MongoClient.connect(db, function(err, client) {
        var db=client.db('events_galore');
        if (err) throw err;
        db.collection("events").find({isfeatured:"yes"}).sort({'id':1}).toArray((err, result)=> {
        if (err) throw err;
        res.send(result)
        });
    });
});



module.exports =router;
