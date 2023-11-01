const express = require('express');

const app = express();

app.use('/api/posts',(req, res, next)=>{
    const posts=[
        {id: 'asd234234', title:'First Tiele', content:'first content'},
        {id: 'asda456456345', title:'Second Tiele', content:'second content'},
        {id: 'sgjhrghr5646', title:'Third Tiele', content:'third content'}
    ]
    res.status(200).json({
        message: 'posts fetched succesfully',
        posts: posts
    })
});


//exportiere alles was in app steckt 
module.exports = app;