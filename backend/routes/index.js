var express = require('express');
var router = express.Router();
var queryController = require('../Control/query');

/* GET home page. */
router.get('/data', queryController.findByQuery);

module.exports = router;
