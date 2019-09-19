const User = require("../models/User");
// const Photo = require("../models/Photo");
const Album = require("../models/Album");

//user authorization
// const bcrypt = require("bcrypt-nodejs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");

const fs = require("fs");
const fsPromises = fs.promises;

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
        logged: true
      },
      require("../config/keys").secretOrKeyOk,
      {
        expiresIn: "1h"
      }
    );

    return { ...userData._doc, _id: userData._id.toString(), token: token };
  },
  fetchAlbums: async function({ userId, status, access }) {
    let newAccess = "";
    if (access) {
      const jwtDecodedString = jwtDecode(access);
      newAccess = jwtDecodedString.data.access;
    }
    const params = {
      userId,
      status,
      access: newAccess
    };

    const albums = await Album.find(params);

    const newAlbums = albums.map(async album => {
      let path = "./client/public/photos/albums/" + album._id;

      if (fs.existsSync(path)) {
        const photos = await fsPromises.readdir(path);
        album.photos = photos.filter(photo => photo != "mini");
      } else {
        album.photos = [];
      }
      return album;
    });

    return newAlbums;
  },
  addAlbum: async function({ albumInput }, req) {
    const album = new Album({
      userId: albumInput.userId,
      name: albumInput.name,
      title: albumInput.title,
      access: albumInput.access,
      description: albumInput.description,
      status: albumInput.access ? "private" : albumInput.status,
      createdAt: albumInput.createdAt
    });

    const storedAlbum = await album.save();

    const path = "./client/public/photos/albums/" + storedAlbum._id;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    } else {
      console.log("path already exists");
    }

    const miniPath =
      "./client/public/photos/albums/" + storedAlbum._id + "/mini/";
    if (!fs.existsSync(miniPath)) {
      fs.mkdirSync(miniPath);
    } else {
      console.log("miniPath already exists");
    }

    return { ...storedAlbum._doc, _id: storedAlbum._id.toString(), photos: [] };
  },
  removeAlbum: async function({ albumId }) {
    try {
      await Album.deleteOne({ _id: albumId });
      const path = "./client/public/photos/albums/" + albumId;

      await fs.rmdir(path, { recursive: true }, err => {
        if (err) console.log("errors:", err);
      });
    } catch (err) {
      const error = new Error(err);
      throw error;
    }
    return { _id: albumId };
  }
  // addPhoto: async function({ photoInput }, req) {
  //   const photo = new Photo({
  //     title: photoInput.title,
  //     description: photoInput.description,
  //     imageUrl: photoInput.imageUrl,
  //     status: photoInput.status,
  //     createdAt: photoInput.createdAt
  //   });

  //   const storedPhoto = await photo.save();

  //   return { ...storedPhoto._doc, _id: storedPhoto._id.toString() };
  // },
  // fetchPhotos: async function({ album, category, user, status }) {
  //   const params = {
  //     status: status
  //   };

  //   if (album && album !== "undefined") params.album = album;
  //   if (category && category !== "undefined") params.category = category;

  //   const photos = await Photo.find(params);

  //   return photos;
  // },
};
