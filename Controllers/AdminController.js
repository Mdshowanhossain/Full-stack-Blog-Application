const UserModle = require("../Models/UserModel");

const updateUserByAdmin = async (req, res) => {};
const deleteUserByAdmin = async (req, res) => {};
const viewUserByAdmin = async (req, res) => {
  const viewUser = await UserModle.findById(req.params.id);
  console.log(viewUser);
  res.render("adminView", { viewUser });
};

module.exports = { updateUserByAdmin, deleteUserByAdmin, viewUserByAdmin };
