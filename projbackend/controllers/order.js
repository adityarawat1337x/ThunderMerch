const { Order, ProductCart } = require("../models/order");

// middleware order Id

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, orderObj) => {
      if (err) {
        return res.status(400).json({ Error: "No order found", Err: err });
      }
      req.order = orderObj;
      next();
    });
};

// creating an order

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, orderObj) => {
    if (err) {
      return res.status(400).json({ Error: "No order Saved", Err: err });
    }
    return res.json({ Ok: orderObj });
  });
};

// all orders of a user

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id firstname")
    .exec((err, orderObj) => {
      if (err) {
        return res.status(400).json({ Error: "No orders Found", Err: err });
      }
      return res.json({ Ok: orderObj });
    });
};

// status of order

exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, orderObj) => {
      if (err) {
        return res
          .status(400)
          .json({ Error: "Cannot update orders", Err: err });
      }
      return res.json({ Ok: orderObj });
    }
  );
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};
