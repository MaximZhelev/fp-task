const Product = require("../models/Product");

const getProducts = async (filter, page = 1, limit = 10) => {
  page = Number(page);
  const products = await Product.find(filter)
    .limit(limit)
    .skip((page - 1) * limit);

  const count = await Product.countDocuments(filter);

  return {
    items: products.map((product) => {
      return {
        name: product.name,
        price: product.price,
        price_max: product.price_max,
        image: product.image_groups.filter((img) => img.view_type == "large")[0]
          .images[0].link,
        filters: product.variation_attributes,
      };
    }),
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
};

const getFilters = async (categoryId) => {
  let query = { variation_attributes: { $ne: null } };

  if (categoryId) {
    query.primary_category_id = categoryId;
  }

  const variationAttributes = await Product.find(query);

  let attributesValues = [];
  variationAttributes.forEach((attributes) => {
    attributes.variation_attributes.forEach((item) => {
      const valuesIndex = attributesValues.findIndex((x) => x.id == item.id);
      if (valuesIndex <= -1) {
        attributesValues.push({ id: item.id, values: [] });
      }

      attributesValues.forEach((attributeValue) => {
        item.values.forEach((itemValue) => {
          const valueIndex = attributeValue.values.indexOf(itemValue.name);
          if (item.id === attributeValue.id && valueIndex == -1) {
            attributeValue.values.push(itemValue.name);
          }
        });
      });
    });
  });

  return attributesValues;
};

module.exports = {
  getProducts,
  getFilters,
};
