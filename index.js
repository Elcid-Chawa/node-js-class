const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Sequalize = require("sequelize");
const db = require("./helpers/db");

//local imports
const User = require("./models/User");
const Notes = require("./models/Notes");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  //   return res.send("Welcome to Node js");

  //   return res.sendFile(path.join(__dirname, "/index.html"));
  return res.render("index.ejs");
});

app.get("/login", (req, res) => {
  //   return res.sendFile(path.join(__dirname, "/login.html"));
  return res.render("login.ejs");
});
app.post("/dashboard", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);

  User.create({
    username: username,
    email: email,
    password: password,
  })
    .then((createdUser) => {
      return res.render("dashboard.ejs", {
        user: createdUser,
        notes: null,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.redirect("/login", { error: "Invalid Credentials" });
    });
});

app.get("/dashboard", async (req, res) => {
  return res.render("dashboard.ejs", {
    user: {
      email: "sample@email.com",
      password: "samplepassword",
      notes: ["note1", "note2", "note 3"],
    },
  });
});

app.get("/register", (req, res) => {
  // return res.sendFile(path.join(__dirname, "/register.html"));
  return res.render("register.ejs");
});

app.post("/register", (req, res) => {
  return res.send("Welcome to the login page!");
});

app.post("/add-note", (req, res) => {
  const note = req.body.note;
  const title = req.body.title;
  const id = req.body.id;

  Notes.create({
    topic: title,
    note: note,
    userId: id,
  })
    .then((note) => {
      return res.render("dashboard", {
        user: { email: "sample@email.com" },
        notes: note,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.redirect("/dashboard");
    });
});

// define relationships
User.hasMany(Notes);
Notes.belongsTo(User, { onDelete: "CASCADE" });

db.sync();

app.listen(3000, () => {
  console.log("listening on port 3000");
});
