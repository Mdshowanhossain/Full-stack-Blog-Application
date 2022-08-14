const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  viewUserByAdmin,
  deleteUserByAdmin,
  updateUserByAdmin,
} = require("../Controllers/AdminController");

const AdminRouter = express.Router();

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

AdminRouter.get("/:id", viewUserByAdmin);
AdminRouter.post("/update/:id", upload.single("image"), updateUserByAdmin);
AdminRouter.get("/delete/:id", deleteUserByAdmin);

module.exports = AdminRouter;
