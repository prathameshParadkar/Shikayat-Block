const crypto = require("crypto");
const User = require("../models/UserSchema");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

function generateOTP() {
  return crypto.randomInt(100000, 999999); // generate OTP between 100000 and 999999
}

async function sendMessage(phone) {
  let otp = generateOTP();
  // let user = await User.findOne({ phone });
  // user.otp = otp;

  // await user.save();
  // Schedule a task to set otp to null after 3 minutes
  // setTimeout(async () => {
  //   // console.log("setting otp to null")
  //   user.otp = null;
  //   await user.save();
  //   // console.log("done")
  // }, 3 * 60 * 1000); //
  // console.log(phone);


  [phone].forEach(async (number) => {
    // console.log(number)
    await client.messages
      .create({
        body: `Your verification code is : ${otp}`,
        from: "+17622499859",
        to: `+91 ${number}`,
      })
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

async function sendMessageDesc(phone, title, status, status_type) {
  console.log("here");
  // let otp = generateOTP();
  // let user = await User.findOne({ phone });
  // user.otp = otp;

  // await user.save();
  // Schedule a task to set otp to null after 3 minutes
  // setTimeout(async () => {
  //   // console.log("setting otp to null")
  //   user.otp = null;
  //   await user.save();
  //   // console.log("done")
  // }, 3 * 60 * 1000); //
  // console.log(phone);

  // console.log(number)
  await client.messages
    .create({
      body: `${title}\n\n${status}\n\n${status_type}`,
      from: "+17622499859",
      // to: `+91 ${number}`,
      to: `+917977323368`,
    })
    .then((r) => {
      console.log(r);
    })
    .catch((e) => {
      console.log(e);
    });
}

module.exports = {
  sendMessageDesc,
  sendMessage,
  generateOTP,
};
