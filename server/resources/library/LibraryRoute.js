var express = require('express');
// var fs = require('fs'); 
var router = express.Router();

router.get('/', function(req, res) {
  res.send('hello library');
  // res.end();
});

module.exports = router;