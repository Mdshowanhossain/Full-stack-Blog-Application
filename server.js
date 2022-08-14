const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// ROUTER IMPORT
const AuthRouter = require("./Routers/AuthRouter");
const UserRouter = require("./Routers/UserRotuer");
const BlogRouter = require("./Routers/BlogRouter");
const AdminRouter = require("./Routers/adminRouter");

// IMPORT MODEL

const PostModel = require("./Models/BlogModel");

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

app.get("/", async (req, res) => {
  try {
    const getAllPost = await PostModel.find().populate("user");
    res.render("index", { getAllPost });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

app.get("/register", (req, res) => {
  res.render("register", { title: "USER || REGISTRATION" });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "USER || LOGIN" });
});

app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/blog", BlogRouter);
app.use("/adminview", AdminRouter);
app.listen(PORT, () => {
  console.log(`server is runnign at ${PORT}`);
});
