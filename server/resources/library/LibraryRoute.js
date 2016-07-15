var express = require('express');
var fs = require('fs'); 
var path = require('path');

var router = express.Router();

router.get('/', function(req, res) {
  fs.readdir(path.join(__dirname + '/../../library'), 'utf8', function(err, files) {
    if (err) {
      throw err; 
    }
    res.send(files); 
  });
});

module.exports = router;