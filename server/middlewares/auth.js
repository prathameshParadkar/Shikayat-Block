// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_secret_key";

const auth = (req, res, next) => {
  console.log("auth middleware");
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);
      console.log("user", user);
      req.userID = user.uid;
      req.userPrivilege = user.privilege;
    } else {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized User", error: error });
  }
};

// export default auth;
module.exports = auth;
