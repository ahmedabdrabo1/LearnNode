const express = require("express");
const mongoose = require("mongoose");
const myData = require("./models/myDb.js");

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

app.get("/", (req, res) => {
  res.sendFile("./view/home.html", { root: __dirname });
});
app.post('/', async (req, res) => {
  console.log("POST body:", req.body);
  const username = new myData({ userName: req.body.userName });

  try {
    const savedUser = await username.save();
    console.log("Saved user:", savedUser);
    res.redirect("/");
  } catch (error) {
    console.error("Failed to save user:", error);
    res.status(500).send("Server error");
  }
});
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running: http://localhost:${port}`);
  });
});
