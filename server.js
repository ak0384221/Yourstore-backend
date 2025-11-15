import e, { json } from "express";
import connectDB from "./database/db.js";
import Products from "./models/product.js";
import cors from "cors";
import {
  getAll,
  getByCategory,
  getById,
  getCartItems,
  getLatest,
  getOnSales,
  removeFromCart,
  saveIntoCart,
} from "./controller/productController.js";
import Cart from "./models/cart.js";
import { Order } from "./models/order.js";
const app = e();
const PORT = 5000;

//middleweres
app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
//

//routes get
app.get("/", async (req, res) => {
  const a = await Products.findOne({ name: "blue watch" });
  res.send(a);
});

app.get("/api/products", getAll);

app.get("/api/products/latest", getLatest);

app.get("/api/products/sales", getOnSales);

app.get("/api/products/category/:category", getByCategory);

app.get("/api/products/:id", getById);

app.get("/api/cart", getCartItems);

app.post("/api/order", async (req, res) => {
  const products = req.body;

  const newOrder = new Order({ products: products });
  await newOrder.save();
});

app.post("/api/cart", saveIntoCart);
app.delete("/api/cart/:id", removeFromCart);

// routes post

// app.post("/api/products", async (req, res) => {
//   const newProduct = {
//     name: "blue watch",
//     description: "blue watch men",
//     stock: 50,
//     category: "accessories",
//     discount: 10,
//     orderStatus: [null],
//     sale:0,
//     price: 1000,cart
//     images: ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"],
//   };
//   try {
//     const result = await Products.create(newProduct);
//     res.send(result);
//   } catch (err) {
//     console.log(err);
//   }
// });

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
//
connectServer();
