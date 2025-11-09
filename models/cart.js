import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  quantity: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
  // Optional: userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
