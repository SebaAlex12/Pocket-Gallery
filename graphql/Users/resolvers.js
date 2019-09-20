const User = require("../../models/User");

//user authorization
// const bcrypt = require("bcrypt-nodejs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async function({ userInput }, req) {
    if (!userInput.name || !userInput.email || !userInput.password) {
      const err = new Error("You left input fields epmty");
      throw err;
    }

    const userExists = await User.findOne({ email: userInput.email });

    if (userExists) {
      const err = new Error("User already exists");
      throw err;
    }

    const salt = bcrypt.genSaltSync(14);
    const hash = bcrypt.hashSync(userInput.password, salt);

    const user = new User({
      name: userInput.name,
      email: userInput.email,
      password: hash,
      createdAt: userInput.createdAt
    });

    const storedUser = await user.save();

    return { ...storedUser._doc, _id: storedUser._id.toString() };
  },
  loginUser: async function({ email, password }) {
    if (!email || !password) {
      const err = new Error("You left input fields epmty");
      throw err;
    }

    const userData = await User.findOne({ email: email });

    if (!userData) {
      const err = new Error("User does not exists");
      throw err;
    }

    const pass = await bcrypt.compare(password, userData.password);

    if (!pass) {
      const err = new Error("Password incorrect");
      throw err;
    }

    const token = await jwt.sign(
      {
        _id: userData._id.toString(),
        name: userData.name,
        email: userData.email,
        createdAt: userData.createdAt,
        tokenCreatedAt: new Date(),
        logged: true
      },
      require("../../config/keys").secretOrKeyOk,
      {
        expiresIn: "1h"
      }
    );

    return { ...userData._doc, _id: userData._id.toString(), token: token };
  }
};
