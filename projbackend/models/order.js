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

module.exports = mongoose.model("ProductCart", productInCartSchema);

var orderSchema = new mongoose.Schema(
  {
    products: [productInCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
