var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const schema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price:Number
});
module.exports = mongoose.model("products", schema);