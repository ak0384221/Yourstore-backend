import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
  colorName: { type: String, required: true },
  stock: { type: Number, default: 0 },
});

const variantSchema = new mongoose.Schema({
  size: { type: String, required: true },
  colors: [colorSchema],
});

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  alt: { type: String },
});

const ratingSchema = new mongoose.Schema({
  average: { type: Number, default: 0 },
  count: { type: Number, default: 0 },
});

const productSchema = new mongoose.Schema({
  // Basic Info
  productId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  brand: { type: String, default: "Unknown" },
  category: { type: String, default: "General" },
  images: [imageSchema],

  // Variants
  variants: [variantSchema],

  // Pricing
  basePrice: { type: Number, required: true },
  discountPercent: { type: Number, default: 0 },
  salePercent: { type: Number, default: 0 },
  finalPrice: { type: Number, required: true },

  // Stock Info
  totalStock: { type: Number, required: true },
  sold: { type: Number, default: 0 },
  availableQuantity: { type: Number, required: true },

  // Status & Ratings
  status: {
    type: String,
    enum: ["active", "on hold", "archived"],
    default: "active",
  },
  rating: ratingSchema,

  // Dates
  addedDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
