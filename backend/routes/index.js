var express = require('express');
var router = express.Router();
var queryController = require('../Control/query');
var sse = require('./sse');

/* GET data page. */
router.get('/data', queryController.findByQuery);

router.get('/serials', queryController.findUniqueSer);

/* Get SSE page*/
router.get('/stream', sse.stream);

module.exports = router;
