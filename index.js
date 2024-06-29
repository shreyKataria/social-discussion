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

// test
// app.use("/", (req, res) => {
//   try {
//     const { name } = req.body;
//     if (name) {
//       res.status(200).json(`hello ${name}`);
//     }
//   } catch (error) {
//     console.log("error", error.message);
//   }
// });

// routes
app.use("/api/users", userRouter);

// server
app.listen(PORT, () => {
  console.log(`app is listening to port : ${PORT}`);
});
