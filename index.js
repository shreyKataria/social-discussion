require("dotenv").config();
const express = require("express");
const { connectDB } = require("./db/db");
const userRouter = require("./routes/userRoute");
const app = express();

const PORT = process.env.PORT || 8000;

// db
connectDB();

// middleware
app.use(express.json());

// routes
app.use("/api/users", userRouter);

// server
app.listen(PORT, () => {
  console.log(`app is listening to port : ${PORT}`);
});
