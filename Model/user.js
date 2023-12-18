var schemaUser = require("../schema/users");

module.exports = {
  getAll: function () {
    return schemaUser.find({}).exec();
  },
  getById: function (id) {
    return schemaUser.findById(id);
  },
  getByName: function (name) {
    return schemaUser.findOne({name}).exec();
  },
  createUser: function (user) {
    return new schemaUser(user).save();
  },
};
