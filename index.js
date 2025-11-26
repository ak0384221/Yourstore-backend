import e, { json } from "express";
import connectDB from "./database/db.js";
import Products from "./models/product.js";
import cors from "cors";
import dotenv from "dotenv";
import {
  getAll,
  getByCategory,
  getById,
  getCartItems,
  getLatest,
  getOnSales,
  getOrders,
  getProductsName,
  removeFromCart,
  saveIntoCart,
  saveOrder,
} from "./controller/productController.js";
import Order from "./models/order.js";
//imports
dotenv.config();
const app = e();
const allowedOrigins = [
  process.env.FRONTEND_URL, // Will be localhost in local .env or Vercel URL in Railway
  "http://localhost:3000", // Optional explicit allowance for local frontend
];
const PORT = process.env.PORT || 5000;
//middleweres
app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);
//routes get

app.get("/api/products", getAll);
app.get("/api/products/latest", getLatest);
app.get("/api/products/sales", getOnSales);
app.get("/api/products/category/:category", getByCategory);
app.get("/api/products/:id", getById);
app.get("/api/cart", getCartItems);
app.get("/api/orders", getOrders);
app.get("/api/getProductsName", getProductsName);
//routes post
app.post("/api/order", saveOrder);
app.post("/api/cart", saveIntoCart);
//patch
app.patch("/api/order/:id", updateOrderStatus);
//delete
app.delete("/api/cart/:id", removeFromCart);
//db connection
async function connectServer() {
  try {
    await connectDB();
    console.log("mongodb database is connected");

    app.listen(PORT, () => {
      console.log("server is running on port", PORT);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
connectServer();
