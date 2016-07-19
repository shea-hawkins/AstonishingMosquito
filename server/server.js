var express = require('express');
var morgan = require('morgan');
var path = require('path');
var libraryRoute = require('./resources/library/LibraryRoute');

var app = express();

var port = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use('/assets', express.static(path.join(__dirname + '/../client/assets')));
app.use('/build', express.static(path.join(__dirname + '/../client/build')));
app.use('/songLibrary', express.static(path.join(__dirname + '/library')));
app.use('/library', libraryRoute);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/index.html'));
});

app.listen(port, function() {
  console.log('Magic happening on port', port);
});
