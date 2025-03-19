const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const maxAge = 7 * 24 * 60 * 60;

const generateToken = (userId, username, role, email) => {
  return jwt.sign({ userId, username, role, email }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password, acceptedTerms, role } = req.body;

    if (!username || !email || !password || !acceptedTerms) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    const newUser = new User({
      username,
      email,
      password,
      acceptedTerms,
      role,
    });

    await newUser.save();

    return res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    return res.json({ user: req.user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const greet = (req, res) => {
  res.send("hello, this is comming from the authController");
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(user._id, user.username, user.role, user.email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: maxAge * 1000,
    });

    return res.json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("token").json({ message: "User logged out successfully!" });
};

module.exports = { registerUser, greet, getMe, loginUser, logoutUser };
