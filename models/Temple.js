const mongoose = require("mongoose");

const TempleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please enter title"],
    },
    slug: { type: String },
    discription: {
      type: String,
      required: [true, "please enter discription"],
    },
    content: {
      type: String,
      required: [true, "please enter content"],
    },
    thumbnail: {
      type: String,
      required: [true, "please submit thumbnail"],
    },
    galleryImages: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
  },
  { timestamps: true }
);

const Temple = mongoose.model("temples", TempleSchema);
module.exports = Temple;
