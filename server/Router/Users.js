const jwt = require("jsonwebtoken");

const express = require("express");
const router = express.Router();

require("../db/Conn");
const User = require("../models/Schema");
// router.get("/", (req, res) => {
//   console.log("Received a GET HTTP method");
//   res.send(`Hello world from the server rotuer js`);
// });

router.get("/", async (req, res) => {
  const userId = req.userID;
  const userPrivilege = req.userPrivilege;
  // console.log("req", req);
  console.log("userId", userId);
  console.log("privilege", userPrivilege);
  try {
    // get all users
    const allUsers = await User.find();
    // if exists return all users in res
    if (allUsers) {
      res.status(200).json({ allUsers });
    }
    // else return error
    else {
      res.status(400).json({ error: "no users found" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

// sign jwt and return []
