const express = require("express");

const { viewUserByAdmin } = require("../Controllers/AdminController");

const AdminRouter = express.Router();

AdminRouter.get("/adminview/:id", viewUserByAdmin);

module.exports = AdminRouter;
