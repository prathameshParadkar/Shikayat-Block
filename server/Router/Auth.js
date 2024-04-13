const jwt = require("jsonwebtoken");

require("dotenv").config();

const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");

const crypto = require("crypto");

require("../db/Conn");
const User = require("../models/UserSchema");
router.get("/", (req, res) => {
  console.log("Received a GET HTTP method");
  res.send(`Hello world from the server rotuer js`);
});

router.post("/register", async (req, res) => {
  console.log("Received a POST HTTP method");
  // const { name, email, phone, work, password, cpassword } = req.body;
  // const { name, email, work, password } = req.body;
  const { name, email, user_role, password } = req.body;
  // if (!name || !email || !phone || !work || !password || !cpassword) {
  // if (!name || !email || !work || !password) {
  if (!name || !email || !user_role || !password) {
    return res.status(422).json({ error: "plz fill data properly" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "already exits" });
    }
    // else if (password != cpassword) {
    //   return res.status(422).json({ error: "passwords doesnt match" });
    // }
    else {
      // const user = new User({ name, email, phone, work, password, cpassword });
      // const user = new User({ name, email, work, password });
      const user = new User({ name, email, user_role, password });
      await user.save();
      res.status(201).json({ message: "user registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  // return res.json({ message: "user signed in successfully" });
  // TODO if successfull then send jwt token
  if (!email || !password) {
    return res.status(400).json({ error: "plz fill data properly" });
  }
  try {
    const userLogin = await User.findOne({ email: email });
    if (!userLogin) {
      res.status(400).json({ error: "user error" });
    } else {
      console.log(userLogin);
      // Replace with your own secret key

      // // privilige 0 for superadmin 1 for admin 2 for user
      // // currently hardcoded to 2, change it later []
      // // TODO
      // const token = jwt.sign(
      //   { uid: userLogin._id, privilege: 2, user_role: userLogin.user_role },
      //   secretKey,
      //   {
      //     expiresIn: "24h",
      //   }
      // );

      sendEmail(email);
      res.status(200).json({ message: "success" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log(email, otp);
    let userLogin = await User.findOne({ email: email });
    console.log(userLogin);

    console.log("otp", userLogin.otp);

    if (userLogin.otp == otp) {
      const secretKey = "your_secret_key";
      const token = jwt.sign(
        { uid: userLogin._id, privilege: 2, user_role: userLogin.user_role },
        secretKey,
        {
          expiresIn: "24h",
        }
      );
      return res.status(200).json({
        message: "user signed in successfully",
        token: token,
        // work: userLogin.work,
        user_role: userLogin.user_role,
        email: userLogin.email,
        name: userLogin.name,
        uid: userLogin._id,
        privilege: 2,
      });
    } else {
      return res.status(403).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Interal Server Error" });
  }
});

async function verifyToken(email, otp) {}

async function sendEmail(toEmail) {
  // create reusable transporter object using the default SMTP transport

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAILPASS,
    },
  });

  let otp = generateOTP();
  let user = await User.findOne({ email: toEmail });
  user.otp = otp;

  await user.save();
  // Schedule a task to set otp to null after 3 minutes
  setTimeout(async () => {
    // console.log("setting otp to null")
    user.otp = null;
    await user.save();
    // console.log("done")
  }, 3 * 60 * 1000); // 3 minutes in milliseconds

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"No Reply" <Support>`, // sender address
    to: toEmail, // list of receivers
    subject: "OTP for Verification", // Subject line
    text: `Your OTP for verification is: ${otp}`, // plain text body
  });
  console.log("otp is", otp);

  console.log(`Message sent: ${info.messageId}`);
}

function generateOTP() {
  return crypto.randomInt(100000, 999999); // generate OTP between 100000 and 999999
}
module.exports = router;

// sign jwt and return []
