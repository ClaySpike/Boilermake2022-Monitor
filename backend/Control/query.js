express = require('express');
Observation = require('../models/index').obs;

// Get a list of data by a query
exports.findByQuery = async (req, res) => {
    console.log(req.headers);

    query = {};

    if (!req.query.sn) {
        query = {}
    } else {
        query = {'sn': req.query.sn};
    }

    res.send(await Observation.find(query));
};