// The main database interface object
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.obs = require('./observations')(mongoose);

module.exports = db;