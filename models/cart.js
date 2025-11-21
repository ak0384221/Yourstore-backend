import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  color: {
    type: String,
  },
  size: {
    type: String,
    enum: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  },
  addedToCart: {
    type: Date,
    default: Date.now,
  },
  finalAmount: {
    type: Number,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
