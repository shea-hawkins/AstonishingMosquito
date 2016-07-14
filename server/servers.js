var express = require('express');
var app = express(); 
var morgan = require('morgan'); 

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/build', express.static(__dirname + '/build'));

app.get('/', function(req, res) {
  res.send('hello world');
});

app.listen(port, function() {
  console.log('Magic happening on port', port);
});

