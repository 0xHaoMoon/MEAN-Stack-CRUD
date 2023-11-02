const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose')

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://haotruong:demo@tutorial.epiyt3a.mongodb.net/node-angular?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connected to database!');
})
.catch(()=>{
    console.log('Connected to database failed!');
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });

  app.post('/api/posts',(req, res, next)=>{
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    console.log(post)
    res.status(201).json({
        message: 'Post added succesfully'
    })
});

app.use('/api/posts',(req, res, next)=>{
    const posts=[
        {id: 'asd234234', title:'First Tiele', content:'first content'},
        {id: 'asda456456345', title:'Second Tiele', content:'second content'},
        {id: 'sgjhrghr5646', title:'Third Tiele', content:'third content'},
        {"_id":{"$oid":"65434323c449a39ba7bedd15"},"title":"asdasd","content":"asdasdasd","__v":{"$numberInt":"0"}}
    ]
    res.status(200).json({
        message: 'posts fetched succesfully',
        posts: posts
    })
});


//exportiere alles was in app steckt 
module.exports = app;