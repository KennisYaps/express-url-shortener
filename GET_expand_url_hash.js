// TASK 2: POST /expand-url/:hash
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

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
        "message": "There is no URL registered for hash value ${getHash}"
      }`);
  }
});

const server = app.lsiten(PORT, function() {
  console.log(
    `You're in a GET expand-url request and listening to port ${PORT}`
  );
});
