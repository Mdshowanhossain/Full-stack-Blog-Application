const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// ROUTER IMPORT

const AuthRouter = require("./Routers/AuthRouter");
const UserRouter = require("./Routers/UserRotuer");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser());

const PORT = process.env.PORT || 9000;

// CONNECT DATABASE
require("./Database/Database");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

// app.get("/forgetpassword", (req, res) => {
//   res.render("forgetpassword");
// });

// app.get("/u", (req, res) => {
//   res.render("resetpassword");
// });

app.use("/auth", AuthRouter);
app.use("/user", UserRouter);

app.listen(PORT, () => {
  console.log(`server is runnign at ${PORT}`);
});
