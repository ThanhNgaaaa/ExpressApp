var schemaProduct = require("../schema/products");
var schemaCategory = require("../schema/category");

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
    return schemaUser
      .find(Search)
      .select("username password")
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .exec();
  },
  getallSort: function () {
    return schemaProduct.find({ isDelete: false }).sort({ order: 1 }).exec();
  },
  getAll: function () {
    return schemaProduct.find({}).exec();
  },
  getById: function (id) {
    return schemaProduct.findById(id);
  },
  getByName: function (name) {
    return schemaProduct.findOne({ name }).exec();
  },
  // createProduct: function (product) {
  //   return new schemaProduct(product).save();
  // },schemaProduct = require("../schema/products");
  createProduct: async function (product) {
    try {
      var newProduct = await new schemaProduct(product).save();
      var category = await schemaCategory.findById(product.categoryId);
      if (category) {
        category.productId.push(newProduct._id);
        await category.save();
      }
      return new schemaProduct(newProduct).save();
    } catch (error) {
      throw error;
    }
  },
};
