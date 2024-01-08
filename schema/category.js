var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var Schema = mongoose.Schema;
var jwt = require("jsonwebtoken");
const configs = require("../helpers/configs");
const crypto = require("crypto");
const schema = new mongoose.Schema({
  name: String,
  isDelete: Boolean,
  order: Number,
  productId: [
    {
      type: Schema.Types.ObjectId,
      ref: "products",
    },
  ],
});
schema.virtual("cat", {
  ref: "products",
  localField: "_id",
  foreignField: "categoryId",
});
schema.set("toJSON", { virtuals: true });
schema.set("toObject", { virtuals: true });

module.exports = mongoose.model("categories", schema);
