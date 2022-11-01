const { Schema, model } = require("mongoose");

const schema = new Schema({
  id: { type: String },
  image: { type: String },
  name: { type: String },
  page_description: { type: String },
  page_title: { type: String },
  c_showMenu: { type: Boolean },
});

module.exports = model("Category", schema);
