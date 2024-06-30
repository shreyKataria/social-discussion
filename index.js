require("dotenv").config();
const express = require("express");
const { connectDB } = require("./db/db");
const UserAuth = require("./routes/userRoute");
const Discussion = require("./routes/discussionRoute");
const app = express();
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 8000;

// db
connectDB();

// middleware
app.use(express.json());

// uploaddir
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// routes
app.use("/api/users", UserAuth);
app.use("/api/discussions", Discussion);

// server
app.listen(PORT, () => {
  console.log(`app is listening to port : ${PORT}`);
});
