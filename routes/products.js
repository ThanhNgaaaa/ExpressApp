var express = require("express");
const responseData = require("../helpers/responseData");
var router = express.Router();

var modelProduct = require("../Model/product");
var productschema = require("../schema/products");
const { body, validationResult } = require("express-validator");
var validate = require("../validates/product");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  var productAll = await modelProduct.getAll();
  responseData.responseReturn(res, 200, true, productAll);
});
router.get("/:id", async function (req, res, next) {
  try {
    var product = await modelProduct.getById(req.params.id);
    responseData.responseReturn(res, 200, true, product);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay product");
  }
});

router.post("/add", validate.validator(), async function (req, res, next) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    responseData.responseReturn(
      res,
      404,
      false,
      errors.array().map((error) => error.msg)
    );
    return;
  }
  var product = await modelProduct.getByName(req.body.name);
  if (product) {
    responseData.responseReturn(res, 404, false, "product da ton tai");
  } else {
    const newProduct = await modelProduct.createProduct({
      description: req.body.description,
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
    });
    responseData.responseReturn(res, 200, true, newProduct);
  }
});
router.put("/edit/:id", async function (req, res, next) {
  try {
    var updatedProduct = await productschema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );
    console.log(updatedProduct);
    responseData.responseReturn(res, 200, true, updatedProduct);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay product");
  }
});
router.delete("/delete/:id", async function (req, res, next) {
  //delete by Id
  try {
    var product = await productschema.findByIdAndDelete(req.params.id);
    responseData.responseReturn(res, 200, true, "xoa thanh cong");
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay product");
  }
});
module.exports = router;
