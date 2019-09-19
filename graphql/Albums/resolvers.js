const Album = require("../../models/Album");

const fs = require("fs");
const fsPromises = fs.promises;
const jwtDecode = require("jwt-decode");

module.exports = {
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
};
