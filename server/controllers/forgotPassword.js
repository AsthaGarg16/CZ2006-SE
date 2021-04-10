const bcrypt = require("bcryptjs");
const UserModal = require("../models/user");
var nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {

  console.log(req.body);
  const { userEmail } = req.body.email;
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "softwarexeon@gmail.com",
      pass: "SoftwareXeon123",
    },
  });
  let r = Math.random().toString(36).substring(7);
  var mailOptions = {
    from: "softwarexeon@gmail.com",
    to: "softwarexeon@gmail.com",
    subject: "MyCal Forgot Password Code",
    text:
      "Please use the following code to reset your password for your MyCal account: " +
      r,
  };


  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    } else {
      console.log("Email sent: " + info.response);
      return res.status(200).json({ message: "Email sent!", code: r });
    }
  });
};

const forgotPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) {
      const filter = { email: email };
      const hashedPassword = await bcrypt.hash(password, 12);
      const updatePass = {
        $set: {
          password: hashedPassword,
        },
      };
      const result = await UserModal.updateOne(filter, updatePass);
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
      );

      return res.status(200).json({ message: "Password updated" });
    } else {
      res.status(500).json({ message: "User does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

module.exports = { sendEmail, forgotPassword };
