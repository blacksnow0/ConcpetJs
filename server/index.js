const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/db");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const authRouter = require("./routes/authRoutes");

const tweetRouter = require("./routes/tweetRoutes");

const commentRouter = require("./routes/commentRoutes");

const PORT = process.env.PORT || 8000;

connectDb();

app.get("/", (req, res) => {
  res.send("Hello, World says concept tweets!");
});

app.use("/api/auth", authRouter);
app.use("/api/tweets", tweetRouter);
app.use("/api/comments", commentRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
