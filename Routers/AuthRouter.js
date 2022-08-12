const express = require("express");
const multer = require("multer");
const path = require("path");
const chckLogIn = require("../Middlewares/UserAuth");

const {
  Registration,
  Login,
  LogoutUser,
  forgetPassword,
  resetPassword,
  resetPasswordUpdate,
} = require("../Controllers/AuthControler");

const AuthRouter = express.Router();

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

AuthRouter.get("/forgetpassword", (req, res) => {
  res.render("forgetpassword");
});

AuthRouter.post("/register", upload.single("image"), Registration);

AuthRouter.post("/login", Login);

AuthRouter.get("/logout", chckLogIn, LogoutUser);

AuthRouter.post("/forgetpassword", forgetPassword);

AuthRouter.get("/resetpassword/:id/:token", resetPassword);

AuthRouter.post("/resetpassword/:id/:token", resetPasswordUpdate);

module.exports = AuthRouter;
