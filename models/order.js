import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  images: {
    type: [
      {
        url: String,
        alt: String,
      },
    ],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  size: {
    type: String,
  },
  brand: {
    type: String,
  },
  color: {
    type: String,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  discountPercent: {
    type: Number,
    default: 0,
  },
  salePercent: {
    type: Number,
    default: 0,
  },
  finalPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const buyerInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: [orderItemSchema],
      required: true,
    },

    buyerInfo: {
      type: buyerInfoSchema,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },
    deliveryCharge: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["cash on delivery", "Bkash"],
      default: "cash on delivery",
    },

    orderStatus: {
      type: String,
      enum: ["placed", "confirmed", "shipped", "delivered"],
      default: "placed",
    },

    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
