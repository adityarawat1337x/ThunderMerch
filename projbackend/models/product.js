const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

let productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 32,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    description: {
      type: Number,
      required: true,
      trim: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    size: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
