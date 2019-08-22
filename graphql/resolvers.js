const User = require("../models/User");
const Photo = require("../models/Photo");

//user authorization
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async function({ userInput }, req) {
    const userExists = await User.findOne({ email: userInput.email });

    if (userExists) {
      const err = new Error("User already exists");
      throw err;
    }
    const hash = await bcrypt.hash(userInput.password, 14);

    const user = new User({
      name: userInput.name,
      email: userInput.email,
      password: hash
    });

    const storedUser = await user.save();

    return { ...storedUser._doc, _id: storedUser._id.toString() };
  },
  loginUser: async function({ email, password }) {
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

    const token = jwt.sign(
      { data: { name: userData.name, email: userData.email } },
      "secretkeyokey",
      {
        expiresIn: "1h"
      }
    );

    return { ...userData._doc, _id: userData._id.toString(), token: token };
  },
  addPhoto: async function({ photoInput }, req) {
    const photo = new Photo({
      title: photoInput.title,
      description: photoInput.description,
      imageUrl: photoInput.imageUrl,
      status: photoInput.status,
      createdAt: photoInput.createdAt
    });

    const storedPhoto = await photo.save();

    return { ...storedPhoto._doc, _id: storedPhoto._id.toString() };
  },
  fetchPhotos: async function({ album, category, user, status }) {
    const params = {
      status: status
    };

    if (album && album !== "undefined") params.album = album;
    if (category && category !== "undefined") params.category = category;

    // console.log(params);

    const photos = await Photo.find(params);

    return photos;
  }
};
