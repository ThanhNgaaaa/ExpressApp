var schemaUser = require("../schema/users");
const bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports = {
  getAll: function () {
    return schemaUser.find({}).exec();
  },
  getById: function (id) {
    return schemaUser.findById(id);
  },
  getByName: function (name) {
    return schemaUser.findOne({ username: name }).exec();
  },
  createUser: function (user) {
    return new schemaUser(user).save();
  },
  login: function (username, password) {
    return schemaUser.checkLogin(username, password);
  },
  getByEmail: function (email) {
      return schemaUser.findOne({ email: email }).exec();
  },
  getByTokenForgot: function (token) {
      return schemaUser.findOne(
          {
              tokenForgot: token,
              tokenForgotExp: { $gte: Date.now() }
          }
      ).exec();
  },
};
