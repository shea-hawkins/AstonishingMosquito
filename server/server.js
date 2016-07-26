var express = require('express');
var morgan = require('morgan');
var path = require('path');
var redis = require('redis');
var libraryRoute = require('./resources/library/LibraryRoute');

// Setup server config
var app = express();
var port = process.env.PORT || 3000;
app.use(morgan('dev'));

// Routes for application
app.use('/assets', express.static(path.join(__dirname + '/../client/assets')));
app.use('/build', express.static(path.join(__dirname + '/../client/build')));
app.use('/songLibrary', express.static(path.join(__dirname + '/songLibrary')));
app.use('/library', libraryRoute);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/index.html'));
});

app.listen(port, function() {
  console.log('Magic happening on port', port);
});


// Setup Redis database 
var client = redis.createClient();

client.on('connect', function() {
    console.log('Redis client connected at port 6379');
});
