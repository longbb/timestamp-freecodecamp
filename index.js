var express = require("express");
var app = express();
var path = require("path");
var strftime = require("strftime");

app.get("/api/timestamp/:time", function (req, res) {
  var isDate = function(dateString) {
    var date;
    if(/^\d{8}\d*$/.test(dateString)) {
      date = new Date(parseInt(dateString) * 1000);
    } else {
      date = new Date(dateString);
    }
    if (date !== "Invalid Date" && !isNaN(date)) {
      return date; 
    } else {
      return false;
    }
  };
  var date = isDate(req.params.time); 
  if (date) {
    res.json({ "unix": Date.parse(date)/1000, "natural": strftime("%B %d, %Y", date) }); 
  } else {
    res.json({ "unix": null, "natural": null  });
  }
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(process.env.PORT || 5000, function () {
  console.log("Example app listening on port 8080!");
});

