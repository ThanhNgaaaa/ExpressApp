var schemaProduct = require("../schema/products");

module.exports = {
  getAll: function () {
    return schemaProduct.find({}).exec();
  },
  getById: function (id) {
    return schemaProduct.findById(id);
  },
  getByName: function (name) {
    return schemaProduct.findOne({name}).exec();
  },
  createProduct: function (product) {
    return new schemaProduct(product).save();
  },
};