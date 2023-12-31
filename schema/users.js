var mongoose = require("mongoose");
const bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');
const configs = require('../helpers/configs')
const schema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  role:String
});
schema.pre('save',function(){
  const salt = bcrypt.genSaltSync(10);
  this.password=bcrypt.hashSync(this.password,salt);
  console.log(this.password);
})
schema.methods.getJWT = function () {
  var token = jwt.sign({ id: this._id }, configs.SECRET_KEY,
      { expiresIn: configs.EXP });
  return token;
}
schema.statics.checkLogin = async function (username, password) {
  if (!username || !password) {
      return { err: 'Hay nhap day du username va password' };
  }
  var user = await this.findOne({username:username});
  if (!user) {
      return { err: 'userName khong ton tai' };
  }
  var result = bcrypt.compareSync(password, user.password);
  if (!result) {
      return { err: 'password sai' };
  }
  console.log(user);
  return user;
}
module.exports = mongoose.model("users", schema);
