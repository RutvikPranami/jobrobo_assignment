const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Create a new product
router.post('/create', productController.createProduct);

// Get all products
router.get('/all', productController.getAllProducts);

// Retrieve products by color and size
router.get('/variations/:color/:size', productController.getProductsByColorAndSize);

module.exports = router;







// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');

// // Create a new product with variations (different prices for sizes and colors)
// router.post('/create', productController.createProduct);

// // Get all product variations for a product
// router.get('/:productId/variations', productController.getProductVariations);

// // Create a new product variation with size, color, and price
// router.post('/:productId/variations', productController.createProductVariation);

// module.exports = router;
