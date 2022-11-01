const Category = require("../models/Category");

const getAllCategories = async () => {
  return await Category.find();
};

module.exports = {
  getAllCategories,
};
