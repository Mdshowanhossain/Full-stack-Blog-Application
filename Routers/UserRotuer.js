const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  updateUser,
  seeProfile,
  viewUserByAdmin,
} = require("../Controllers/UserController");
const chckLogIn = require("../Middlewares/UserAuth");
const UserRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(__dirname, "../public/userImages"),
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

UserRouter.get("/profile", chckLogIn, seeProfile);

UserRouter.post("/update/:id", chckLogIn, upload.single("image"), updateUser);

// UserRouter.get("/adminview/:id", viewUserByAdmin);

module.exports = UserRouter;
