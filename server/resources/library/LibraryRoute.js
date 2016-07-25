var express = require('express');
var fs = require('fs');
var path = require('path');
var redis = require("redis");
var client = redis.createClient();
var mm = require('musicmetadata'); // Extract metadata from songs
var md5File = require('md5-file/promise'); // Calculate the hash of song data for redis key
var multer = require('multer'); // Multi-part form upload parser used to handle the song uploads
// Directs song upload to be saved in server library folder 
var upload = multer( { 
  dest: path.join(__dirname + '/../../songLibrary/')
} ).single('song');

var router = express.Router();

router.get('/', function(req, res) {
  return new Promise(function(resolve, reject) {
    client.hgetall('music library', function(err, libraryHash) {
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
      mm(fs.createReadStream(path.join(__dirname + '/../../songLibrary/' + req.file.filename)), function (err, metadata) {
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
