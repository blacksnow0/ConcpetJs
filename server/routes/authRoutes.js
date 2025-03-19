const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  registerUser,
  greet,
  getMe,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/register", registerUser);

authRouter.get("/greet", greet);

authRouter.get("/me", authMiddleware, getMe);

authRouter.post("/login", loginUser);

authRouter.post("/logout", authMiddleware, logoutUser);

module.exports = authRouter;
