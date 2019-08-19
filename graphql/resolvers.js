const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  createUser: async function({ userInput }, req) {
    const userExists = User.findOne({ email: userInput.email });
    if (!userExists) {
      const err = new Error("User already exists");
      throw err;
    }
    const hash = bcrypt.hash(userInput.password, 14);
    const user = new User({
      name: userInput.name,
      email: userInput.email,
      password: userInput.password
    });

    const storedUser = await user.save();

    return { ...storedUser._doc, _id: storedUser._id.toString() };
  }
};
