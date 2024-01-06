var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const schema = new mongoose.Schema({
    name: String
});
module.exports = mongoose.model("departments", schema);