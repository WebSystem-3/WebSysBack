var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const http = require("http");

var indexRouter = require("./routes/index");

var usersRouter = require("./routes/user");
var taskRouter = require("./routes/task");
var friendsRouter = require("./routes/friend");
var app = express();
const server = http.createServer(app);
server.maxConnections = 100;
//session test route
var testRouter = require("./routes/test");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.set("etag", false);
const options = { etag: false };

app.use(express.static("public", options));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    key: "loginData",
    secret: "testSecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/", taskRouter);
app.use("/", friendsRouter);
app.use("/test", testRouter);
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
