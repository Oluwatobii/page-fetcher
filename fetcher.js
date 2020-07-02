const request = require("request");
const fs = require("fs");

args = process.argv.slice(2); // is an array [];

request(args[0], (error, response, body) => {
  fs.writeFile(args[1], body, (err) => {
    if (err) throw err;
    var stats = fs.statSync(args[1]);
    var fileSizeInBytes = stats["size"];
    console.log(
      "Downloaded and saved " + fileSizeInBytes + " bytes to ./index.html"
    );
  });
  console.log("error:", error); // Print the error if one occurred
  console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
  console.log("body:", body); // Print the HTML for the Google homepage.
});
