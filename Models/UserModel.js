const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
    },
    cPassword: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      default: "",
    },
    token: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
const Users = mongoose.model("User", UserSchema);
module.exports = Users;
