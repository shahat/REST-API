const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb://localhost:27017/wekidb");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO

app.listen(3000, function() {
  console.log("Server started on port 3000");
});