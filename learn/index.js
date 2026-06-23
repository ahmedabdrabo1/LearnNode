const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 4000;

app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/myDatabase");
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

app.get("/", (req, res) => {
  res.sendFile("./view/home.html", { root: __dirname });
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running: http://localhost:${port}`);
  });
});