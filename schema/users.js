var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var Schema = mongoose.Schema;
var jwt = require("jsonwebtoken");
const configs = require("../helpers/configs");
const crypto = require("crypto");
const schema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  role: String,
  tokenForgot: String,
  tokenForgotExp: String,
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: "departments",
  },
});

schema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});
schema.methods.getJWT = function () {
  var token = jwt.sign({ id: this._id }, configs.SECRET_KEY, {
    expiresIn: configs.EXP,
  });
  return token;
};
schema.methods.addTokenForgotPassword = function () {
  var tokenForgot = crypto.randomBytes(31).toString("hex");
  this.tokenForgot = tokenForgot;
  this.tokenForgotExp = Date.now() + 15 * 60 * 1000;
  return tokenForgot;
};
schema.statics.checkLogin = async function (username, password) {
  if (!username || !password) {
    return { err: "Hay nhap day du username va password" };
  }
  var user = await this.findOne({ username: username });
  if (!user) {
    return { err: "userName khong ton tai" };
  }
  var result = bcrypt.compareSync(password, user.password);
  if (!result) {
    return { err: "password sai" };
  }
  console.log(user);
  return user;
};
module.exports = mongoose.model("users", schema);
