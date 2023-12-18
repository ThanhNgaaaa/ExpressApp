var express = require("express");
const responseData = require("../helpers/responseData");
var router = express.Router();
var students = [
  {
    id: 1,
    name: "John",
    diemTB: 9
  },
  {
    id: 2,
    name: "Jane",
    diemTB: 2
  },
  {
    id: 3,
    name: "Harry",
    diemTB: 5
  }
];

router.get("/", function (req, res, next) {
    console.log(generateID(64));
    responseData.responseReturn(res, 200, true, students);
});
router.get("/getall", function (req, res, next) {
  responseData.responseReturn(res, 200, true, students);
});
router.get("/getbyID/:id", function (req, res, next) {
  res.setHeader("Content-Type", "text/html");

  var student = students.find((student) => student.id == req.params.id);

  if (student) {
    responseData.responseReturn(res, 200, true, student);
  } else {
    responseData.responseReturn(res, 404, false, "khong tim thay student");
  }
});

router.post("/post", function (req, res, next) {
  var student = students.find((student) => student.id == req.body.id);
  console.log(req.body.id);
  if (student) {
    responseData.responseReturn(res, 404, false, "student da ton tai");
  } else {
    const newstudent = {
      id: req.body.id,
      name: req.body.name,
      diemTB: req.body.diemTB,
    };
    students.push(newstudent);
    responseData.responseReturn(res, 200, true, newstudent);
  }
});
router.put("/edit/:id", function (req, res, next) {
  var student = students.find((student) => student.id == req.params.id);
  if (student) {
    student.name = req.body.name;
    student.diemTB = req.body.diemTB;
    responseData.responseReturn(res, 200, true, student);
  } else {
    responseData.responseReturn(res, 404, false, "khong tim thay student");
  }
});
router.delete("/delete/:id", function (req, res, next) {
  //delete by Id
  var ids = students.map((student) => student.id);
  var index = ids.indexOf(parseInt(req.params.id));
  console.log(index);
  //var index  = students.indexOf(student);
  if (index > -1) {
    students.splice(index, 1);
    responseData.responseReturn(res, 200, true, students);
  } else {
    responseData.responseReturn(res, 404, false, "khong tim thay user");
  }
});
function generateID(length){
    let result ="";
    let source="abcdefghjklmnoptxyz0123456789";
    for(let i = 0; i < length; i++){
        result+=source[Math.floor(Math.random()*source.length)];

    }
    return result;
}
module.exports = router;
