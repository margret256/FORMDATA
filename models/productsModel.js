// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, trim: true 
  },
  category: { 
    type: String, 
    required: true, 
    trim: true 
  },
  price: {
     type: Number, 
     required: true,
      min: 0 
    },
  quantity: { 
    type: Number,
     required: true,
      min: 0 
    },
  color: {
     type: String, 
     trim: true, 
     default: '' 
    },
  // number of units that have been ordered but not yet delivered (for expected revenue calc)
  onOrder: {
     type: Number,
      required: true,
       min: 0, 
       default: 0
       },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Product', ProductSchema);
