import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
  },
  category: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  arrivalDate: {
    type: String,
  },
  orderStatus: {
    type: ["null", "placed", "confirmed", "delivered", "received"],
    required: true,
    default: "null",
  },
  sale: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

const Products = mongoose.model("products", productSchema);
export default Products;
