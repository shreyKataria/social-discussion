const User = require("../model/userModel");

// POST http://localhost:8000/api/users/signup
const signUp = async (req, res) => {
  const { name, mobile, email, password } = req.body;
  try {
    const userExists = await User.findOne({ $or: [{ mobile }, { email }] });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

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

// POST : http://localhost:8000/api/users/login
const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPasswords(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT : http://localhost:8000/api/users/update/:id
const updateUser = async (req, res) => {
  const { name, mobile, email } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.mobile = mobile || user.mobile;
    user.email = email || user.email;
    // const token = user.getSignedToken();

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET : http://localhost:8000/api/users/
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET http://localhost:8000/api/users/search
const searchUser = async (req, res) => {
  const { name } = req.query;
  try {
    const users = await User.find({ name: new RegExp(name, "i") });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE : http://localhost:8000/api/users/delete/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// token utility function
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token, user: user });
};
module.exports = {
  logIn,
  signUp,
  updateUser,
  getUsers,
  searchUser,
  deleteUser,
};
