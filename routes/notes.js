var express = require('express');
var router = express.Router();
var fs = require('fs'); //filesystem
const { resolve } = require('path');

const dataPath = "./data/notes.json";

const errorMsg = {
	{
		//getAll error = 0
		"id" : 0,
		"code": 500,
		"description" : "Cant read From JSONFile"
	},
	{
		//get Specific = 1
		"id" : 1,
		"code" : 400,
		"description" : "Could not find the specified Note"
	},
	{
		//post new note = 2
		"id" : 2,
		"code" : 400,
		"description" : "query not defined correctly"
	},
	{
		//update(put) note = 3
		"id" : 3,
		"code" : 400,
		"description" : "Could not find note to edit"
	}
}
/* GET all Notes. */
router.get('/', function(req, res, next) {
  fs.readFile(dataPath, (err,data) =>{
      if(err) {
      	console.log(err);
	throw err;
	
      }

      res.send(JSON.parse(data));
  });
});

//POST a new Note
router.post('/', function(req, res, next) {

    //jag vill l‰sa in hela "filen" och ta reda pÂ hur mÂnga poster som finns
    //fundera pÂ JavaScript Object vs JSON som text, dvs vi har en Array med data
    //ta antalet poster och ˆka med 1
    //detta tal blir mitt nya id
        fs.readFile(dataPath, (err,data) =>{
            if(err) {
		console.log(err);
                throw err;
            }
            var notesdata = JSON.parse(data);
            var newNotesId = Object.keys(notesdata).length + 1;
            notesdata[newNotesId] = JSON.parse(req.body.data);
            notesdata[newNotesId].id = newNotesId;
            fs.writeFile(dataPath, JSON.stringify(notesdata), (err) => { 
                if (err) 
                  console.log(err);
		  res.status(500).send("Could not write note[" + newNotesId + "] to file" );
              }); 
        });
    //vi F√ñRV√ÑNTAR oss att nu √§r notesdata populerat med data
    //MEN sÂ ‰r inte fallet!!
    //funktionen ovan forts√§tter jobba och vi hamnar h√∂r direkt
    //INNAN n√•got v√§rde har populerats till notesdata
    //console.log(notesdata); //varf√∂r funkar inte detta????
    //res.status(200).send("new user added successfully");
    
    
  });

module.exports = router;
