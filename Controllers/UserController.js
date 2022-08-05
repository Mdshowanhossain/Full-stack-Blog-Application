const UserModle = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const res = require("express/lib/response");

const seeProfile = async (req, res) => {
  try {
    const findUser = await UserModle.findById(req.id);
    res.render("profile", { findUser });
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
