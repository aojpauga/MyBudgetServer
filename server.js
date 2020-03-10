const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ajdb:Talofa123@cluster0-a37uh.mongodb.net/mybudgetdb?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

var User = mongoose.model("User", {
  name: String,
  income: 0,
  expense: 0
});

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/mybudget/users", function(req, res) {
  console.log("GET called");
  User.find({}).then(function(users) {
    res.json(users);
  });
});

app.post("/mybudget/users", function(req, res) {
  console.log("The body", req.body);

  let user = new User({
    name: req.body.name,
    income: req.body.income,
    expense: req.body.expense
  });
  user.save().then(function() {
    res.sendStatus(201);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
