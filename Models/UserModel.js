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
    status: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      // required: true,
    },
    blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog" }],
  },
  {
    timestamps: true,
  }
);
const Users = mongoose.model("User", UserSchema);
module.exports = Users;
