const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, categoryObj) => {
    if (err) {
      return res.status(400).json({ Error: "Category not found" });
    }
    req.category = categoryObj;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, categoryObj) => {
    if (err) {
      return res.status(400).json({ Error: "No category created" });
    }
    return res.json(categoryObj);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, categoryObj) => {
    if (err) {
      return res.status(400).json({ Error: "No category updated" });
    }
    return res.json(categoryObj);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, categoryObj) => {
    if (err) {
      return res.status(400).json({ Error: "No category deleted" });
    }
    return res.json({
      Error: `Category:${categoryObj} deleted successfully`,
    });
  });
};
