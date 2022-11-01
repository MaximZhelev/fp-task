const { Schema, model } = require("mongoose");

const schema = new Schema({
  price_max: Number,
  page_description: String,
  page_title: String,
  name: String,
  price: Number,
  variation_attributes: [],
  id: String,
  currency: String,
  master: {
    orderable: Boolean,
    price: Number,
    master_id: String,
  },
  primary_category_id: String,
  image_groups: [],
  short_description: String,
  orderable: Boolean,
  variants: [],
  type: {
    master: Boolean,
  },
  long_description: String,
  c_isSale: Boolean,
  c_showMenu: { type: Boolean },
});

module.exports = model("Product", schema);
