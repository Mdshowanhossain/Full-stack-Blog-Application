const jwt = require("jsonwebtoken");

const UserModel = require("../Models/UserModel");

const chckLogIn = async (req, res, next) => {
  try {
    // console.log(req.headers.cookie);
    // console.log(req.header.authorization);
    if (req.headers.authorization) {
      const { authorization } = req.headers;
      const token = authorization?.split(" ")[1];
    }
    token = req.cookies.jwt;

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);

    // if (!decoded) {
    //   return res.status(403).redirect("/login");
    // }

    const { username, id, status } = decoded;

    req.id = id;
    req.token = token;
    req.status = status;
    req.username = username;

    next();
  } catch (err) {
    res.status(500).redirect("/login");
    // res.send(err.message);
  }
};
module.exports = chckLogIn;
