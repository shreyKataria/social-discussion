require("dotenv").config();
const express = require("express");
const { connectDB } = require("./db/db");
const app = express();

const PORT = process.env.PORT || 8000;

connectDB();

app.use(express.json());

app.use("/", (req, res) => {
  try {
    const { name } = req.body;
    if (name) {
      res.status(200).json(`hello ${name}`);
    }
  } catch (error) {
    console.log("error", error.message);
  }
});

app.listen(PORT, () => {
  console.log(`app is listening to port : ${PORT}`);
});
