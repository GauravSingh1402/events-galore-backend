const mongoose =require('mongoose');

const db='mongodb+srv://eventgalore:eventgalore@cluster0.kz4zp.mongodb.net/events_galore?retryWrites=true&w=majority'

mongoose.connect(db).then(()=> {
    console.log('Connected to mongo!!!!!!!')
}).catch((err)=> 
    console.log(err));