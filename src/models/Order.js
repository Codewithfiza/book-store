import mongoose from 'mongoose';


//order item schemaa
const OrderItemSchema =  new mongoose.Schema({
    id: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: '' },
  quantity: { type: Number, required: true, min: 1 },
  wasOnOffer: { type: Boolean, default: false },
})


const OrderSchema =  new mongoose.Schema({
orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
     items: [OrderItemSchema],
      customer: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
     subtotal: { type: Number, required: true },
     deliveryFee: { type: Number, required: true },
     total: { type: Number, required: true },
    paymentMethod: {
      type: String,
      default: 'Cash on Delivery',
    },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },

},{timestamps: true});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);