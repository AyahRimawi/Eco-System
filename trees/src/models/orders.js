import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'canceled','paid'],
    default: 'pending'
  },
// add
  paymentInfo: {
    method: {
      type: String,
      required: true,
      enum: ['stripe','credit_card', 'paypal', 'bank_transfer']
    },
    stripePaymentIntentId: String,
    stripeClientSecret: String,
    paypalOrderId: String, 
    paidAt: Date,
    transactionId: String,
    paidAt: Date
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Orders || mongoose.model('Orders', ordersSchema,'orders');
