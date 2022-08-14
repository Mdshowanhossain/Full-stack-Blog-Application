const UserModle = require("../Models/UserModel");
const PostModle = require("../Models/BlogModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const seeProfile = async (req, res) => {
  try {
    if (req.status === "admin") {
      const findAdmin = await UserModle.findOne({ status: "admin" });
      const findUser = await UserModle.find().populate("blogs");
      const findPost = await PostModle.find().populate("user");

      return res.render("admin", {
        findAdmin,
        findUser,
        findPost,
        title: "ADMIN || PROFILE",
      });
    } else if (req.status === "user") {
      const findUser = await UserModle.findById(req.id).populate("blogs");
      res.render("profile", { findUser, title: "USER || PROFILE" });
    }
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    if (req.body.password !== req.body.cPassword) {
      return res.status(500).send({
        success: false,
        message: "Password & Confirm Password are not same",
      });
    }
    const hashpassword = await bcrypt.hash(req.body.password, 10);

    const updateUserData = await UserModle.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: hashpassword,
          image: req.file.filename,
        },
      },
      { new: true }
    );

    res.redirect("/");
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

module.exports = {
  updateUser,
  seeProfile,
};
