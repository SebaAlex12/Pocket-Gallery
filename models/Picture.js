const mongoose = required("mongoose");
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
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

module.exports = Picture = mongoose.model("Picture", PictureSchema);
