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

    //jag vill läsa in hela "filen" och ta reda på hur många poster som finns
    //fundera på JavaScript Object vs JSON som text, dvs vi har en Array med data
    //ta antalet poster och öka med 1
    //detta tal blir mitt nya id

    var notesdata; //= JSON.parse(fs.readFile(dataPath));

    fs.readFile(dataPath, (err,data) =>{
        if(err) {
            throw err;
        }
        //console.log(JSON.parse(data));
        notesdata = JSON.parse(data);
        //console.log(notesdata);
        var newNotesId = Object.keys(notesdata).length + 1;
        notesdata[newNotesId] = req.body.data;
        console.log(notesdata);
        //fs.writeFile(dataPath, JSON.stringify(notesdata));
    });

    //vi FÖRVÄNTAR oss att nu är notesdata populerat med data
    //MEN så är inte fallet!!
    //funktionen ovan fortsätter jobba och vi hamnar hör direkt
    //INNAN något värde har populerats till notesdata
    console.log(notesdata); //varför funkar inte detta????

    //console.log(notesdata[0].title);

   //var newNotesId = Object.keys(notesdata).length + 1;
    //notesdata[newNotesId] = req.body.data;

    //fs.writeFile(dataPath, JSON.stringify(notesdata));

    res.status(200).send("new user added successfully");
    
    
  });

module.exports = router;
