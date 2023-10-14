// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: String,
//   sizes: [String],
//   colors: [String],
//   price:[Number],
//   imageUrl:[String]
// });

// module.exports = mongoose.model('Product', productSchema);





const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  variations: [
    {
      size: String,
      color: String,
      price: Number,
      
    },
  ],
});

module.exports = mongoose.model('Product', productSchema);
