const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

const Registration = async (req, res) => {
  try {
    if (req.body.password !== req.body.cPassword) {
      return res.status(401).send({
        success: false,
        message: "Password & Confirm Password is not same",
      });
    }
    const hashpass = await securePassword(req.body.password, 10);
    const pic = req.file.filename ? req.file.filename : "";
    console.log(pic);
    const user = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashpass,
      image: pic,
    });
    console.log("Body User--", user);
    const validateUser = await UserModel.findOne({ email: req.body.email });
    if (validateUser) {
      return res
        .status(400)
        .send({ success: false, message: "This Email alreay in use!" });
    }

    await user.save();
    res.status(200).redirect("/login");
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message });
  }
};

const Login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(403)
        .send({ success: false, message: "Email Wrong credentials!" });
    }
    const decryptPass = await bcrypt.compare(req.body.password, user.password);

    if (!decryptPass) {
      return res
        .status(403)
        .send({ success: false, message: "Wrong credentialsfladsflsdjflds!" });
    }

    const jwtToken = await jwt.sign(
      { id: user._id, username: user.username, status: user.status },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("jwt", jwtToken, {
      expires: new Date(Date.now() + 3000000),
      httpOnly: true,
      // secure: true,
    });

    res.status(200).redirect("/");
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

const LogoutUser = async (req, res) => {
  try {
    await res.clearCookie("jwt");
    res.status(200).redirect("/login");
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const findEmail = await UserModel.findOne({ email: email });
  if (!findEmail) {
    return res
      .status(404)
      .send({ success: false, message: "This E-mail have no account!" });
  } else {
    const secret = process.env.JWT_SECRET;

    const payload = {
      id: findEmail.id,
      email: findEmail.email,
    };

    const jwtToken = await jwt.sign(payload, secret, { expiresIn: "15min" });

    // console.log(jwtToken);

    const link = `http://localhost:8000/auth/resetpassword/${findEmail.id}/${jwtToken}`;

    res.send(`
    <div
      style="
        background-color: #f2f2f2;
        font-size: 2rem;
        color: #b9b8b8;
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: center;
        height: 50vh;
      "
    >
      <span>Password Reset Link! Please</span>
      <a 
      style="
      color: red;
    "
      href="${link}">Click here
      </a> 
    </div>
    `);
  }
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const findUser = await UserModel.findOne({ id: id });

  if (!findUser) {
    return res
      .status(403)
      .send({ success: false, message: "Acctual user not found" });
  }

  const secret = process.env.JWT_SECRET;

  await jwt.verify(token, secret, { expiresIn: "15min" });

  res.render("resetpassword", {
    title: "USER || RESET PASSWORD LINK",
    id: id,
    token: token,
    email: findUser.email,
  });
};

const resetPasswordUpdate = async (req, res) => {
  try {
    const { id, token } = req.params;
    const findUser = await UserModel.findOne({ id: id });
    if (!findUser) {
      return res
        .status(403)
        .send({ success: false, message: "Acctual user not found" });
    }
    const secret = process.env.JWT_SECRET;
    await jwt.verify(token, secret, { expiresIn: "15min" });

    const { password, cPassword } = req.body;
    if (password !== cPassword) {
      return res.status(401).send({
        success: false,
        message: "Password & Confirm Password is not match!",
      });
    }

    const hashpassword = await bcrypt.hash(req.body.password, 10);

    await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          password: hashpassword,
        },
      },
      { new: true }
    );
    res.status(200).redirect("/login");
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

module.exports = {
  Registration,
  Login,
  LogoutUser,
  forgetPassword,
  resetPasswordUpdate,
  resetPassword,
};
