const request = require("request");
const fs = require("fs");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

args = process.argv.slice(2); // is an array [];

request(args[0], (error, response, body) => {
  if (fs.existsSync(args[1])) {
    console.log("The file exists.");
    rl.question(
      "Type in 'y' (followed by the enter key) to overwrite this file  ",
      (answer) => {
        if (answer !== "y") {
          console.log("Ok...Not over-writing  ");
          process.exit();
        } else {
          console.log("Over-writing existing file  ");
          writeFile(args[1], body);
        }
        rl.close();
      }
    );
  } else {
    writeFile(args[1], body);
  }

  // console.log("error:", error); // Print the error if one occurred
  // console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
  // console.log("body:", body); // Print the HTML for the Google homepage.
});

const writeFile = (newFile, body) => {
  fs.writeFile(newFile, body, (err) => {
    if (err) throw err;
    var stats = fs.statSync(newFile);
    var fileSizeInBytes = stats["size"];
    console.log(
      "Downloaded and saved " + fileSizeInBytes + " bytes to " + newFile + "."
    );
    process.exit();
  });
};
