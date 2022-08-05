const jwt = require("jsonwebtoken");

const UserModel = require("../Models/UserModel");

const chckLogIn = async (req, res, next) => {
  try {
    // console.log(req.headers.cookie);
    if (req.header.authorization) {
      const { authorization } = req.headers;
      const token = authorization?.split(" ")[1];
    }
    token = req.cookies.jwt;

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const { username, id } = decoded;

    req.id = id;
    req.username = username;
    req.token = token;

    next();
  } catch (err) {
    res.status(500).redirect("/login");
    // res.send(err.message);
  }
};
module.exports = chckLogIn;
