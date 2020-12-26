const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const product = require("../models/product");
const { sortBy } = require("lodash");

// middleware param find product by id
exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, productObj) => {
      if (err || !productObj) {
        res.status(400).json({ Error: "No product found" });
      }
      req.product = productObj;
      next();
    });
};

// create product
exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res
        .status(400)
        .json({ Error: "Problem with form data", Err: err });
    }

    // restriction on files
    const { name, description, price, category, stock } = fields;
    if (!name || !description || !price || !category || !stock)
      return res
        .status(400)
        .json({ Error: "Please include all fields", Err: err });

    const product = new Product(fields);

    // handling files(photos)
    if (file.photo) {
      if (file.photo.size > 3000000 || file.photo.size < 1024) {
        return res.status(400).json({ Error: "file size error", Err: err });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // saving to db
    product.save((err, productObj) => {
      if (err) {
        res.status(400).json({
          Error: "Saving in Database failed",
          Err: err,
        });
      }
      return res.json(productObj);
    });
  });
};

// get product details
exports.getProduct = (req, res) => {
  res.product.photo = undefined;
  return res.json(req.product);
};

// middleware get product photo
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(product.photo.data);
  }
  next();
};

// middleware updation stock
exports.updateStock = (req, res, next) => {
  let operation = req.body.order.products.map((product) => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: {
          $inc: { stock: -product.count, sold: +product.count },
        },
      },
    };
  });

  Product.bulkWrite(operation, {}, (err, products) => {
    if (err) {
      return res
        .status(400)
        .json({ Error: "Problem updating stocks", Err: err });
    }
    // return res({ Ok: "Products stocks updated", Products: product });
    next();
  });
};
// delete controller
exports.removeProduct = (req, res) => {
  let product = req.product;
  product.delete((err, productObj) => {
    if (err) {
      return res
        .status(400)
        .json({ Error: "Failed to delete product", Err: err });
    } else {
      return res.json({ Ok: "Product deleted", Product: productObj });
    }
  });
};

//update controller
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res
        .status(400)
        .json({ Error: "Problem with form data", Err: err });
    }

    // updating fields
    const product = req.product;
    product = _.extend(product, fields);

    // handling files(photos)
    if (file.photo) {
      if (file.photo.size > 3000000 || file.photo.size < 1024) {
        return res.status(400).json({ Error: "file size error" });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // saving to db
    product.save((err, productObj) => {
      if (err) {
        res.status(400).json({
          Error: "Saving in Database failed",
          ERR: err,
        });
      }
      return res.json(productObj);
    });
  });
};

// listing controller
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-photo")
    .populate("category")
    .limit(limit)
    .sort([[sortBy, "asc"]])
    .exec((err, productsObj) => {
      if (err || !productsObj) {
        return res.status(400).json({
          Error: "Error retrieving Products",
          err: err,
          Products: productsObj,
        });
      }
      return res.json(productsObj);
    });
};
