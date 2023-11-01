const express = require('express');

const app = express();

app.use((req, res, next)=>{
    console.log('First middleware');
    // next udamit es nicht auf req wartet 
    next();
});

app.use((req, res, next)=>{
    res.send('Hello from express')
});


//exportiere alles was in app steckt 
module.exports = app;