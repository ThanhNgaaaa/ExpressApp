var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const schema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
});
module.exports = mongoose.model("users", schema);
