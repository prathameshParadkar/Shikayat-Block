const mongooose = require("mongoose");

const userSchema = new mongooose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: false,
  },
  otp: {
    type: Number,
    required: false,
  },
  work: {
    type: String,
    required: false,
  },
  user_role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: false,
  },
  events: {
    type: Array,
    required: false,
  },
  complaints: {
    type: Object,
    required: false,
  },
});

const User = mongooose.model("USER", userSchema);

module.exports = User;
