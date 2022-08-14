const bcrypt = require("bcrypt");

const UserModle = require("../Models/UserModel");
const PostModle = require("../Models/BlogModel");

const updateUserByAdmin = async (req, res) => {
  try {
    const hashpassword = await bcrypt.hash(req.body.password, 10);
    const findUser = await UserModle.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: hashpassword,
        image: req.file.filename,
      },
    });
    if (findUser) return res.redirect("/user/profile");
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message });
  }
};
const deleteUserByAdmin = async (req, res) => {
  try {
    const user = await UserModle.findById(req.params.id);
    await PostModle.deleteMany({ user: user.id });
    await UserModle.findByIdAndDelete(req.params.id);
    res.status(200).redirect("/user/profile");
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};
const viewUserByAdmin = async (req, res) => {
  try {
    const viewUser = await UserModle.findById(req.params.id);
    res.render("adminView", { viewUser, title: "ADMIN || VIEW" });
    if (!viewUser)
      return res.send(404).send({ success: false, message: "No post found!" });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

module.exports = { updateUserByAdmin, deleteUserByAdmin, viewUserByAdmin };
