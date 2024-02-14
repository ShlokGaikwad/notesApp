const express = require("express");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/signup", (req, res) => {
  const { username, email, pass } = req.body;
  bcrypt.hash(pass, 5, async (err, hash) => {
    try {
      const user = new UserModel({ ...req.body, pass: hash });
      await user.save();
      res.status(200).send({ msg: "new user created successfully" });
    } catch (error) {
      res.status(500).send(error);
    }
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    bcrypt.compare(pass, user.pass, function (err, result) {
      if (result) {
        const accessToken = jwt.sign(
          { userID: user._id, author: user.username },
          "shlok"
        );
        res.cookie("token", accessToken);
        res.status(200).send({ msg: "Login successful", user });
      } else {
        res.status(200).send({ msg: "Login failed" });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = userRouter;
