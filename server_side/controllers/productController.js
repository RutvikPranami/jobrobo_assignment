const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name,imageUrl, variations } = req.body;
    const newProduct = new Product({ name,imageUrl, variations });
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all products', error: error.message });
  }
};

// Retrieve products by color and size
exports.getProductsByColorAndSize = async (req, res) => {
  try {
    const { color, size } = req.params;
    
    // Find products with matching color and size
    const products = await Product.find({
      'variations.color': color,
      'variations.size': size,
    });

    if (products.length === 0) {
      return res.status(201).json({ message: 'No products found for the specified color and size' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products by color and size', error: error.message });
  }
};





// const Product = require('../models/Product');

// // Create a new product with variations (different prices for sizes and colors)
// exports.createProduct = async (req, res) => {
//   try {
//     const { name, variations } = req.body;
//     const newProduct = new Product({ name, variations });
//     await newProduct.save();
//     res.status(201).json({ message: 'Product created successfully', product: newProduct });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating product', error: error.message });
//   }
// };

// // Get all product variations for a product
// exports.getProductVariations = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     res.status(200).json(product.variations);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching product variations', error: error.message });
//   }
// };

// // Create a new product variation with size, color, and price
// exports.createProductVariation = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const { size, color, price , imageUrl  } = req.body;
//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     product.variations.push({ size, color, price , imageUrl  });
//     await product.save();
//     res.status(201).json({ message: 'Product variation added successfully', product });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating product variation', error: error.message });
//   }
// };
