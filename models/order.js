import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "confirmed", "delivered"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  // Optional: userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export const Order = mongoose.model("Order", orderSchema);
