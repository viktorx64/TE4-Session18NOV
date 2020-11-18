var express = require('express');
var router = express.Router();
var fs = require('fs'); //filesystem

const dataPath = "./data/notes.json";

/* GET all Notes. */
router.get('/', function(req, res, next) {
  fs.readFile(dataPath, (err,data) =>{
      if(err) {
          throw err;
      }

      res.send(JSON.parse(data));
  });
});


router.post('/', function(req, res, next) {
    res.send(req.body.data);
  });

module.exports = router;
