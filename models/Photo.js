const mongoose = required("mongoose");
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
  createdAt: {
    type: String,
    required: true
  }
});

module.exports = Photo = mongoose.model("Photo", PhotoSchema);
