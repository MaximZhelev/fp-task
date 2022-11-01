const express = require("express");
const router = express.Router();
const { parseQuery, getNextPage, getPreviousPage } = require("../utils/index");
const categoryService = require("../services/category");
const productService = require("../services/product");

/* GET home page. */
router.get("/", async (req, res) => {
  const page = req.query.page;
  const query = Object.entries(req.query);
  const filter = parseQuery(query);

  const categories = await categoryService.getAllCategories();
  const filters = await productService.getFilters();
  const products = await productService.getProducts(filter, page);

  const currentUrl = req.originalUrl;

  const nextPage = getNextPage(currentUrl, products.currentPage);
  const previousPage = getPreviousPage(currentUrl, products.currentPage);

  res.render("index.ejs", {
    products,
    categories,
    filters,
    nextPage,
    previousPage,
  });
});

/* GET category page. */
router.get("/:categoryId", async (req, res) => {
  const page = req.query.page;
  const primary_category_id = req.params.categoryId;
  const query = Object.entries(req.query);
  const filter = parseQuery(query, primary_category_id);

  const categories = await categoryService.getAllCategories();
  const products = await productService.getProducts(filter, page);
  const filters = await productService.getFilters(primary_category_id);

  const currentUrl = req.originalUrl;

  const nextPage = getNextPage(currentUrl, products.currentPage);
  const previousPage = getPreviousPage(currentUrl, products.currentPage);

  res.render("index.ejs", {
    products,
    categories,
    filters,
    nextPage,
    previousPage,
  });
});

module.exports = router;
