var express = require('express');
var fs = require('fs'); 
var path = require('path');

var router = express.Router();

router.get('/', function(req, res) {
  return new Promise(function(resolve, reject) {
    fs.readdir(path.join(__dirname + '/../../library'), 'utf8', function(err, files) {
      err ? reject(err) : resolve(files); 
    });
  });
});

module.exports = router;