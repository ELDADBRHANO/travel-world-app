const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const cryptPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: cryptPass,
    });

    const userSaved = await newUser.save();
    res.status(200).json(userSaved._id);
    console.log("\x1b[42m%s\x1b[0m", "[SUCCESSES] to register user");
  } catch (error) {
    res.status(500).json({ message: "cant register", err: error });
    console.log("\x1b[41m%s\x1b[0m", "[Failed] to register user");
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });

    if (!user) {
      console.log("\x1b[41m%s\x1b[0m", "[Failed]  user is null logging user");
      res.status(400).json("check your password or user Name");
    } else {
      const validatePass = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validatePass) {
        console.log("\x1b[41m%s\x1b[0m", "[Failed] pass logging user");
        res.status(400).json("check your password or user Name");
      }
      res.status(200).json(user);
      console.log("\x1b[42m%s\x1b[0m", "[success]  logging user");
    }
  } catch (error) {
    res.status(500).json({ message: "cant login", err: error });
    console.log("\x1b[41m%s\x1b[0m", "[Failed]  logging user");
  }
};

module.exports = {
  registerUser,
  loginUser,
};
