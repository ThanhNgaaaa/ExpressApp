var express = require("express");
const responseData = require("../helpers/responseData");
var router = express.Router();

var modelDepartment = require("../Model/department");
var departmentschema = require("../schema/department");
const { body, validationResult } = require("express-validator");
var validate = require("../validates/product");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  var departmentAll = await modelDepartment.getAll();
  responseData.responseReturn(res, 200, true, departmentAll);
});
router.get("/:id", async function (req, res, next) {
  try {
    var department = await modelDepartment.getById(req.params.id);
    responseData.responseReturn(res, 200, true, department);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay department");
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
  var department = await modelDepartment.getByName(req.body.name);
  if (department) {
    responseData.responseReturn(res, 404, false, "department da ton tai");
  } else {
    const newdepartment = await modelDepartment.createDepartment({
      name: req.body.name,
    });
    responseData.responseReturn(res, 200, true, newdepartment);
  }
});
router.put("/edit/:id", async function (req, res, next) {
  try {
    var updatedDepartment = await departmentschema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );
    console.log(updatedDepartment);
    responseData.responseReturn(res, 200, true, updatedDepartment);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay department");
  }
});
router.delete("/delete/:id", async function (req, res, next) {
  //delete by Id
  try {
    var department = await departmentschema.findByIdAndDelete(req.params.id);
    responseData.responseReturn(res, 200, true, "xoa thanh cong");
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay department");
  }
});
module.exports = router;
