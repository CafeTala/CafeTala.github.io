const productService = require('../services/productService');

exports.getProductList = async (req, res) => {
  const query = req.query;
  try {
    const products = await productService.fetchProducts(query);
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProductDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productService.fetchProductDetails(id);
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
