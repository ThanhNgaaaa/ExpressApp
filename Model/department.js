var schemaDepartment = require("../schema/department");

module.exports = {
  getAll: function () {
    return schemaDepartment.find({}).exec();
  },
  getById: function (id) {
    return schemaDepartment.findById(id);
  },
  getByName: function (name) {
    return schemaDepartment.findOne({name}).exec();
  },
  createDepartment: function (department) {
    return new schemaDepartment(department).save();
  },
};