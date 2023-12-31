var express = require("express");
const responseData = require("../helpers/responseData");
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
var modelUser = require("../Model/user");
var usersshc = require("../schema/users");
const { body, validationResult } = require("express-validator");
var validate = require('../validates/user')
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get("/", async function (req, res, next) {
  var userAll = await modelUser.getAll();
  responseData.responseReturn(res, 200, true, userAll);
});
router.get("/:id", async function (req, res, next) {
  try {
    var user = await modelUser.getById(req.params.id);
    responseData.responseReturn(res, 200, true, user);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay user");
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
  var user = await modelUser.getByName(req.body.username);
  if (user) {
    responseData.responseReturn(res, 404, false, "user da ton tai");
  } else {
    const newUser = await modelUser.createUser({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    });
    responseData.responseReturn(res, 200, true, newUser);
  }
});
router.put('/edit/:id', async function (req, res, next) {
  try {
    var user = await modelUser.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    responseData.responseReturn(res, 200, true, user);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay user");
  }
});
router.delete('/delete/:id', function (req, res, next) {//delete by Id
  try {
    var user = modelUser.findByIdAndDelete(req.params.id);
    responseData.responseReturn(res, 200, true, "xoa thanh cong");
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay user");
  }
});
module.exports = router;
