const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var productInCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  price: Number,
  count: Number,
  totalPrice: Number,
});
const ProductCart = mongoose.model("ProductCart", productInCartSchema);

var orderSchema = new mongoose.Schema(
  {
    products: [productInCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
      type: String,
      default: "Recieved",
      enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"],
    },
    updated: Date,

    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, ProductCart };
