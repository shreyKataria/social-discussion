// routes/auth.js
const express = require("express");
const User = require("../model/userModel");

const router = express.Router();

const signUp = async (req, res) => {
  const { name, mobile, email, password } = req.body;
  try {
    const userExists = await User.findOne({ $or: [{ mobile }, { email }] });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      mobile,
      email,
      password,
    });

    await newUser.save();
    sendToken(newUser, 201, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await user.matchPasswords(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token, user: user });
};
module.exports = {
  logIn,
  signUp,
};
