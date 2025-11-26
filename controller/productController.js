import Cart from "../models/cart.js";
import Order from "../models/order.js";
import Products from "../models/product.js";
//imports
async function getAll(req, res) {
  try {
    const q = req.query.q || ""; // get query string

    // MongoDB regex search (case-insensitive)
    const products = await Products.find({
      name: { $regex: q, $options: "i" }, // search by name
    });

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
async function getLatest(req, res) {
  const { quantity } = req.query;
  try {
    const latestItems = await Products.find()
      .sort({ arrivalDate: -1 })
      .limit(quantity);
    return res.json(latestItems);
  } catch (err) {
    res.json({ message: err.message });
  }
}
async function getOnSales(req, res) {
  const { quantity } = req.query;
  try {
    const onSaleProducts = await Products.find({ sale: { $gt: 0 } }).limit(
      quantity
    );
    res.json(onSaleProducts);
  } catch (err) {
    res.json({ message: err.message });
  }
}
async function getByCategory(req, res) {
  const { category } = req.params;
  try {
    const specificCatProducts = await Products.find({
      category: new RegExp(`^${category}$`, "i"), // simple version
    });
    res.json(specificCatProducts);
  } catch (err) {
    res.json({ message: er.message });
  }
}
async function getById(req, res) {
  const { id } = req.params;
  try {
    const product = await Products.find({ productId: id });
    res.json(product);
  } catch (err) {
    res.json({ message: err.message });
  }
}
async function saveIntoCart(req, res) {
  const { product, productId, quantity, color, size, finalAmount } = req.body;
  try {
    const existingProduct = await Cart.findOne({ productId });
    if (!existingProduct) {
      const newCartItem = new Cart({
        product,
        productId,
        quantity,
        color,
        size,
        finalAmount,
      });
      const result = await newCartItem.save();
      // save to DB here
      res.json("cart item added");
    }
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
}
async function removeFromCart(req, res) {
  const { id } = req.params;
  try {
    await Cart.findByIdAndDelete(id);
    res.json("cart item removed");
  } catch (err) {
    res.json(err);
  }
}
async function getCartItems(req, res) {
  try {
    const cartItems = await Cart.find().populate("product");
    res.json(cartItems);
  } catch (err) {
    res.json(err);
  }
}
async function getOrders(req, res) {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.json(err);
  }
}
async function saveOrder(req, res) {
  try {
    const products = req.body;
    const newOrder = new Order(products);
    await newOrder.save();
    res.json(newOrder);
  } catch (err) {
    res.json(err);
  }
}

async function getProductsName(req, res) {
  try {
    const products = await Products.find().select("name productId");
    res.json(products);
  } catch (err) {
    res.json(err);
  }
}

async function updateOrderStatus(req, res) {
  try {
    const updatedData = req.body;
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  } catch (err) {
    res.json(err);
  }
}

export {
  getAll,
  getLatest,
  getOnSales,
  getByCategory,
  getById,
  saveIntoCart,
  removeFromCart,
  getCartItems,
  getOrders,
  saveOrder,
  getProductsName,
  updateOrderStatus,
};
