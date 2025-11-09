import Cart from "../models/cart.js";
import Products from "../models/product.js";

async function getAll(req, res) {
  try {
    const allItems = await Products.find();
    res.json(allItems);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getLatest(req, res) {
  const { quantity } = req.query;
  console.log(quantity);
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
    const product = await Products.find({ _id: id });
    res.json(product);
  } catch (err) {
    res.json({ message: err.message });
  }
}
async function saveIntoCart(req, res) {
  const { productId, quantity } = req.body;
  console.log(productId, quantity);
  try {
    const existingProduct = await Cart.findOne({ productId });
    if (!existingProduct) {
      const newCartItem = new Cart({ productId, quantity });
      await newCartItem.save();
      // save to DB here
      res.json("cart item added");
    }
    console.log(existingProduct);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}
async function removeFromCart(req, res) {
  const { id } = req.params;
  console.log(id);
  try {
    await Cart.findByIdAndDelete(id);
    res.json("cart item removed");
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}
async function getCartItems(req, res) {
  console.log("hello cart");
  try {
    const cartItems = await Cart.find().populate("productId");
    console.log(cartItems);
    res.json(cartItems);
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
};
