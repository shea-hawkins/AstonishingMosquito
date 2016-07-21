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
    fs.readdir(path.join(__dirname + '/../../library'), 'utf8', function(err, files) {
      if (err) {
        reject(err);
      } else {
        files = files.filter(function(item) {
          return !(/(^|\/)\.[^\/\.]/g).test(item);
        });
        resolve(files);
      }
    });
  })
  .then(function(songFiles) {
    var promises = [];
    songFiles.forEach(function(fileName) {
      promises.push(new Promise(function (resolve,reject) {
        mm(fs.createReadStream(path.join(__dirname + '/../../library/' + fileName)), function (err, metadata) {
          // Coverart is not currently processed,
          // so it is removed from the response.
          delete metadata.picture;
          metadata.fileName = fileName;
          resolve(metadata);
        });
      }));
    });
    return Promise.all(promises);
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
        // Coverart is not currently processed,
        // so it is removed from the response.
        delete metadata.picture;
        metadata.fileName = req.file.filename;
        resolve(metadata);
      });
    })
    .then(function(metadata) {
      md5File(req.file.path)
      .then(function(hash) {
        client.hmset(hash, 'metadata', JSON.stringify(metadata)); // leave as filename for now and replace out with contents needed for audiocontroller
      }).then(function() {
        res.sendStatus(201);
      })
    });
    // Everything went fine 
  });
});



module.exports = router;
