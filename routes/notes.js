var express = require('express');
var router = express.Router();

/* GET all Notes. */
router.get('/', function(req, res, next) {
  res.send('notes coming soon');
});

module.exports = router;
