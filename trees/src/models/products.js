import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Products || mongoose.model('Products', productsSchema,'products');
