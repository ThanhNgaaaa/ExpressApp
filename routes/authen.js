var express = require("express");
const responseData = require("../helpers/responseData");
var router = express.Router();
const bcrypt = require("bcrypt");
var modelUser = require("../Model/user");
var usersshc = require("../schema/users");
const { body, validationResult } = require("express-validator");
var validate = require("../validates/user");
var jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
const configs = require("../helpers/configs");
const { checkLogin,checkRole } = require("../middlewares/protect");

/* GET users listing. */

router.post("/register", validate.validator(), async function (req, res, next) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    responseData.responseReturn(
      res,
      400,
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
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    responseData.responseReturn(res, 200, true, newUser);
  }
});
router.post("/login", async function (req, res, next) {
  var result = await modelUser.login(req.body.username, req.body.password);
  if (result.err) {
    responseData.responseReturn(res, 400, true, result.err);
    return;
  }
  var result = await modelUser.login(req.body.username, req.body.password);
  if (result.err) {
    responseData.responseReturn(res, 400, true, result.err);
    return;
  }
  console.log(result);
  var token = result.getJWT();
  res.cookie("tokenJWT", token);
  responseData.responseReturn(res, 200, true, token);
});

router.get(
  "/me",
  async function (req, res, next) {
    var result = await checkLogin(req);
    if (result.err) {
      responseData.responseReturn(res, 400, true, result.err);
      return;
    }
    req.userID = result;
    next();
  },
  checkRole("admin"),
  async function (req, res, next) {
    try {
      var user = await modelUser.getById(req.userID);
      res.send({ done: user });
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
