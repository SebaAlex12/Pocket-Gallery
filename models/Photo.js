const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  imageUrl: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  }
});

module.exports = Photo = mongoose.model("photos", PhotoSchema);
