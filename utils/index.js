const parseQuery = (query, categoryId) => {
  let filter = {};

  if (categoryId) {
    filter = { primary_category_id: categoryId };
  }

  if (query.length > 0) {
    filter["$and"] = [];

    query.forEach((q) => {
      const filterId = q[0];
      const filterValue = q[1];

      if (filterId != "page" && filterId != "price") {
        filter.$and.push({
          variation_attributes: {
            $elemMatch: {
              id: filterId,
              values: { $elemMatch: { name: filterValue } },
            },
          },
        });
      } else if (filterId == "price") {
        filter.$and.push({
          price: { $lte: filterValue },
        });
      }
    });
  }

  if (filter.$and?.length === 0) {
    delete filter.$and;
  }

  return filter;
};

const getNextPage = (currentPath, currentPage) => {
  if (currentPath.includes("page")) {
    currentPath = currentPath.replace(
      `page=${currentPage}`,
      `page=${currentPage + 1}`
    );
  } else {
    if (currentPath.includes("?")) {
      currentPath += `&page=${currentPage + 1}`;
    } else {
      currentPath += `?page=${currentPage + 1}`;
    }
  }

  return currentPath;
};

const getPreviousPage = (currentPath, currentPage) => {
  if (currentPath.includes("page") && currentPage > 1) {
    currentPath = currentPath.replace(
      `page=${currentPage}`,
      `page=${currentPage - 1}`
    );
  }

  return currentPath;
};

module.exports = {
  parseQuery,
  getNextPage,
  getPreviousPage,
};
