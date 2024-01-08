var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const schema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
  isDelete: Boolean,
  order: Number,
  categoryId: [
    {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
  ],
});
module.exports = mongoose.model("products", schema);
