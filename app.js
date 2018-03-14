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
// TASK 1
const existingURLs = [
  { id: "1", url: "www.google.com", hash: "MQ==" },
  { id: "2", url: "www.facebook.com", hash: "Mg==" }
];
app.post("/shorten-url", function(req, res) {
  var getURL = req.body.url;
  var encoding = encode(getURL, existingURLs);
  var matchingURLs = existingURLs.filter(element => element.url === getURL);
  if (matchingURLs.length === 0) {
    existingURLs.push(generateHash);
  }
  res.send({
    hash: encoding
  });
});

// TASK 2: POST /expand-url/:hash
app.get("/expand-url/:hash", function(req, res) {
  var getHash = req.params.hash;
  try {
    var decodedURL = decode(getHash, existingURLs);
    res.status(200);
    res.send(`{
      "url": ${decodedURL}
    }`);
  } catch (error) {
    res.status(404);
    res.send(`{
      "message": "There is no long URL registered for hash value ${getHash}"
    }`);
  }
});

// TASK 3: DELETE/expand-url/:hash
app.delete("/expand-url/:hash",function(req,res){
  try{    
    var getHash = req.params.hash; 
    let matchingHash = existingURLs.filter(object => {
      // you need to separate in order to debug what is object.hash
        object.hash === getHash});
    if (matchingHash.length === 1 ){
      existingURLs.splice(0,1);
      res.status(200); 
      res.send(`{
          "message": "URL with hash value ${getHash} deleted successfully";
      }`)
    } 
  }catch(error){
    res.status(404);
    res.send(`{
      "message": "URL with hash value ${getHash} does not exist";
  }`)
  }
})
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
