express = require('express');
Observation = require('../models/index').obs;

// Get a list of data by a query
exports.findByQuery = async (req, res) => {
    console.log(req.headers);

    res.send(await Observation.find({}));
};