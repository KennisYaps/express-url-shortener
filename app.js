const express = require("express");
const bodyParser = require("body-parser");

// load our own helper functions
const encode = require("./demo/encode");
const decode = require("./demo/decode");

const app = express();
app.use(bodyParser.json());

// TODO: Implement functionalities specified in README
app.get("/", function(req, res) {
  res.send("Hello world!");
});

const existingURLs = [
  { id: "1", url: "www.google.com", hash: "MQ==" },
  { id: "2", url: "www.facebook.com", hash: "Mg==" }
];

// BONUS TASK 1
app.get("/:someHash", function(req, res) {
  let getSomeHash = req.params.someHash;
  try {
    let decodedURL = decode(getSomeHash, existingURLs);
    res.status(200);
    let redirect = res.redirect("https://" + decodedURL);
  } catch (error) {
    res.status(404);
    res.send(`{"message": "URL with hash value ${getSomeHash} does not exist";
   }`);
  }
});
// this read the error (404) and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.send("error");
});

module.exports = app;
