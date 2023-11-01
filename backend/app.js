const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Header",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });

  app.post('/api/posts',(req, res, next)=>{
    const post = req.body;
    console.log(post)
    res.status(201).json({
        message: 'Post added succesfully'
    })
});

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