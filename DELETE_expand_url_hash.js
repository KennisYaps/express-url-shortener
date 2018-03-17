// TASK 3: DELETE/expand-url/:hash
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.delete("/expand-url/:hash", function(req, res) {
  var getHash = req.params.hash;
  let matchingHash = existingURLs.filter(
    object =>
      // you need to separate in order to debug what is object.hash
      object.hash === getHash
  );
  if (matchingHash.length === 1) {
    existingURLs.splice(0, 1);
    res.status(200);
    res.send(`{
            "message": "URL with hash value ${getHash} deleted successfully";
        }`);
  } else {
    res.status(404);
    res.send(`{
        "message": "URL with hash value ${getHash} does not exist";
    }`);
  }
});

const server = app.lsiten(PORT, function() {
  console.log(
    `You're in a DELETE expand-url request and listening to port ${PORT}`
  );
});
