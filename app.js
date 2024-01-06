var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// const userdb = require("../myExpressApp/schema/Model/users")
var indexRouter = require("./routes/index");
var itemsRouter = require("./routes/items");
var usersRouter = require("./routes/users");
var studentsRouter = require("./routes/students");
var productsRouter = require("./routes/products");
var authenRouter = require("./routes/authen");
var departmentRouter = require('./routes/departments');

const { error } = require("console");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/items", itemsRouter);
app.use("/users", usersRouter);
app.use("/students", studentsRouter);
app.use("/products", productsRouter);
app.use("/authen", authenRouter);
app.use("/department",departmentRouter);

mongoose.connect("mongodb://127.0.0.1:27017/TestDB")
mongoose.connection.on('error', err => {
  logError(err);
});
mongoose.connection.once('open', function(){
console.log("thanh cong");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
