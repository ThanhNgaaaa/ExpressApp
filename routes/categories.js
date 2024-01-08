var express = require("express");
const responseData = require("../helpers/responseData");
var router = express.Router();

var modelCategory = require("../Model/category");
var categoryschema = require("../schema/category");
const { body, validationResult } = require("express-validator");
var validate = require("../validates/product");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  var categoryAll = await modelCategory.getallSort();
  responseData.responseReturn(res, 200, true, categoryAll);
});
router.get("/:id", async function (req, res, next) {
  try {
    var category = await modelCategory.getById(req.params.id).populate('productId');
    responseData.responseReturn(res, 200, true, category);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay category");
  }
});
// validate.validator(),
router.post("/add",  async function (req, res, next) {
//   var errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     responseData.responseReturn(
//       res,
//       404,
//       false,
//       errors.array().map((error) => error.msg)
//     );
//     return;
//   }
  var category = await modelCategory.getByName(req.body.name);
  if (category) {
    responseData.responseReturn(res, 404, false, "category da ton tai");
  } else {
    const newcategory = await modelCategory.createCategory({
      name: req.body.name,
      isDelete:req.body.isDelete,
      order:req.body.order,
      productId:req.body.productId
    });
    responseData.responseReturn(res, 200, true, newcategory);
  }
});
router.put("/edit/:id", async function (req, res, next) {
  try {
    var updatedCategory = await updatedCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );
    console.log(updatedCategory);
    responseData.responseReturn(res, 200, true, updatedCategory);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay category");
  }
});
router.put("/delete/:id", async function (req, res, next) {
  try {
    var deletedCategory = await categoryschema.findfindByIdAndUpdate(
      req.params.id,
      {
        isDelete:true
      },
      { returnDocument: "after" }
    );
    console.log(deletedCategory);
    responseData.responseReturn(res, 200, true, deletedCategory);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay category");
  }
});
// router.delete("/delete/:id", async function (req, res, next) {
//   //delete by Id
//   try {
//     var department = await departmentschema.findByIdAndDelete(req.params.id);
//     responseData.responseReturn(res, 200, true, "xoa thanh cong");
//   } catch (error) {
//     responseData.responseReturn(res, 404, false, "khong tim thay department");
//   }
// });
module.exports = router;
