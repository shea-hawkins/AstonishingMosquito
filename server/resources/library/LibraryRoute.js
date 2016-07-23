var express = require('express');
var fs = require('fs');
var path = require('path');
var mm = require('musicmetadata');
var md5File = require('md5-file/promise');
var redis = require("redis");
var client = redis.createClient();

var multer = require('multer');
var upload = multer( {
  dest: path.join(__dirname + '/../../library/')
} ).single('song');

var router = express.Router();

router.get('/', function(req, res) {
  return new Promise(function(resolve, reject) {
    client.hgetall('music library', function(err, libraryHash) {
      console.log('object', libraryHash);
      var songs = [];
      for (var songHash in libraryHash) {
        songs.push(JSON.parse(libraryHash[songHash]));
      }
      resolve(songs);
    });
  })
  .then(function(metadata) {
    res.send(metadata);
  });
});

router.post('/', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      console.log('multer error', err);
      return;
    }
    new Promise(function(resolve, reject) {
      mm(fs.createReadStream(path.join(__dirname + '/../../library/' + req.file.filename)), function (err, metadata) {
        delete metadata.picture;
        metadata.fileName = req.file.filename;
        resolve(metadata);
      });
    })
    .then(function(metadata) {
      md5File(req.file.path)
      .then(function(hash) {
        return client.hset('music library', hash, JSON.stringify(metadata));
      }).then(function() {
        res.sendStatus(201);
      }).catch(function(error) {
        console.log('database error', error);
      })
    })
    .catch(function(error) {
      console.log('mss error', error);
    });
  });
});

module.exports = router;
