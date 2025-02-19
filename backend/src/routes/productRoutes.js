const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getProductList);
router.get('/:id', productController.getProductDetails);

module.exports = router;
