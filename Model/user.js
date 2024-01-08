var schemaUser = require("../schema/users");
const bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports = {
  getall: function (query) {
    var sort = {};
    var Search = {};
    if (query.sort) {
      if (query.sort[0] == "-") {
        sort[query.sort.substring(1)] = "desc";
      } else {
        sort[query.sort] = "asc";
      }
    }
    if (query.key) {
      Search.username = new RegExp(query.key, "i");
    }
    var limit = parseInt(query.limit) || 2;
    var page = parseInt(query.page) || 1;
    var skip = (page - 1) * limit;
    return schemaUser.find(Search)
      .select("username password")
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .exec();
  },
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
    return schemaUser
      .findOne({
        tokenForgot: token,
        tokenForgotExp: { $gte: Date.now() },
      })
      .exec();
  },
};
