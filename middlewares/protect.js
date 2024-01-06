var jwt = require("jsonwebtoken");
const configs = require("../helpers/configs");
var modelUser = require("../Model/user");
module.exports = {
  checkLogin: async function (req) {
    var result = {};
    var token = req.headers.authorization;
    if (!token) {
      result.err = "Vui lòng đăng nhập";
      return result;
    }
    if (token&&token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      
    } else {
      if(req.cookies.tokenJWT){
        token = req.cookies.tokenJWT;
      }else{
        result.err = "Vui long dang nhap";
        return result;
      }    
    }
    try {
      var userID = await jwt.verify(token, configs.SECRET_KEY);
      return result = userID.id;
    } catch (error) {
      result.err = "Vui long dang nhap";
      return result;
    }
  },
  checkRole: function (role) {
    return async function (req, res, next) {
      var user = await modelUser.getById(req.userID);
      console.log(user.role);
      if (!user) {
        var result = {};
        result.err = "Người dùng không tồn tại";
        return res.status(404).json(result);
      }
      if (user.role === role) {
        next();
      } else {
        var result = {};
        result.err = "Bạn không đủ quyền truy cập";
        return res.status(403).json(result);
      }
    };
  },
};
