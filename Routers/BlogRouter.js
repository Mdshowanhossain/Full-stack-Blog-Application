const express = require("express");
const multer = require("multer");
const path = require("path");

const BlogRouter = express.Router();

// IMPORT CONTROLLER
const {
  PostBlog,
  ReadPost,
  EditPost,
  updatePost,
  Delete,
} = require("../Controllers/BlogController");

const ChckLogIn = require("../Middlewares/UserAuth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(__dirname, "../public/blogimages"),
      function (error, success) {
        if (error) throw error;
      }
    );
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name, function (error, success) {
      if (error) throw error;
    });
  },
});

const upload = multer({ storage: storage });

BlogRouter.get("/", ChckLogIn, (req, res) => {
  res.render("postblog");
});
BlogRouter.post("/post", ChckLogIn, upload.single("image"), PostBlog);
BlogRouter.get("/:id", ReadPost);
BlogRouter.get("/edit/:id", EditPost);
BlogRouter.post("/update/:id", upload.single("image"), updatePost);
BlogRouter.get("/delete/:id", ChckLogIn, Delete);

module.exports = BlogRouter;
