//require is the node.js import syntax thats import the package http
const http = require('http')

//importiert express app 
const app = require('./backend/app');

const port = process.env.PORT || 3000

app.set('port', port);
const server =  http.createServer(app);

server.listen(port);