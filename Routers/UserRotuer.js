const express = require("express");

const { updateUser, seeProfile } = require("../Controllers/UserController");

const chckLogIn = require("../Middlewares/UserAuth");

const UserRouter = express.Router();

UserRouter.get("/profile", chckLogIn, seeProfile);

UserRouter.post("/update/:id", chckLogIn, updateUser);

module.exports = UserRouter;
