const resetPasswordEmail = async (name, email, token) => {
  try {
    const trasporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,

      auth: {
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
      },
    });
    console.log(process.env.EMAIL_USER);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "For Reset Password",
      html:
        "<p> Hi" +
        name +
        +email +
        'Please copy the link <a href="http://localhost:8000/forgetpassword?token=' +
        token +
        ' ">and reset your password</a> </p>',
    };
    trasporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        // res
        // console.log(err);

        res.send(err);
      } else {
        console.log("Mail has been send");
      }
    });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

const forgetPassword = async (req, res) => {
  const findEmail = await UserModle.findOne({ email: req.body.email });
  // console.log(findEmail);
  if (!findEmail) {
    return res
      .status(404)
      .send({ success: false, message: "This E-mail have no account!" });
  } else {
    const randomString = randomstring.generate();
    const email = req.body.email;
    // const findEmail = await UserModel.findOne({ email: email });

    UserModle.updateOne(
      { email: email },
      {
        $set: {
          token: randomString,
        },
      }
    );
    resetPasswordEmail(findEmail.username, findEmail.email, randomString);
  }
};
