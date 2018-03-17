// TASK 1
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post("/shorten-url", function(req, res) {
  var getURL = req.body.url;
  var encoding = encode(getURL, existingURLs);
  var matchingURLs = existingURLs.filter(element => element.url === getURL);
  if (matchingURLs.length === 0) {
    var newObject = {
      id: Number.parseInt(existingURLs.length - 1) + 1,
      url: getURL,
      hash: encoding
    };
    existingURLs.push(newObject);
  }
  res.send({
    hash: encoding
  });
});

const server = app.lsiten(PORT, function() {
  console.log(
    `You're in a POST shorten-url request and listening to port ${PORT}`
  );
});
