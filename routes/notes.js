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

//POST a new Note
router.post('/', function(req, res, next) {
    fs.appendFile(dataPath, req.body.data, (err) =>{
        if(err) {
            throw err;
        }

        res.send("new note added");
    });
    
  });

module.exports = router;
