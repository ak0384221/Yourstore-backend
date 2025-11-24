import Cart from "../models/cart.js";
import Order from "../models/order.js";
import Products from "../models/product.js";
//imports
async function getAll(req, res) {
  // const mapDummyProduct = (item) => {
  //   const discount = item.discountPercentage || 0;
  //   const basePrice = item.price;
  //   const finalPrice = basePrice - (basePrice * discount) / 100;

  //   return {
  //     productId: `P-${item.id}`, // fallback
  //     name: item.title,
  //     description: item.description,
  //     brand: item.brand || "Unknown",
  //     category: item.category || "General",

  //     // images → [{ url, alt }]
  //     images: (item.images || []).map((url, index) => ({
  //       url,
  //       alt: `${item.title} image ${index + 1}`,
  //     })),

  //     // No variants in dummyjson, create a default
  //     variants: [
  //       {
  //         size: "Default",
  //         colors: [
  //           {
  //             colorName: "Default",
  //             stock: item.stock ?? 0,
  //           },
  //         ],
  //       },
  //     ],

  //     // pricing
  //     basePrice,
  //     discountPercent: discount,
  //     salePercent: 0,
  //     finalPrice: Number(finalPrice.toFixed(2)),

  //     // stock
  //     totalStock: item.stock ?? 0,
  //     sold: 0,
  //     availableQuantity: item.stock ?? 0,

  //     // status
  //     status: item.availabilityStatus === "In Stock" ? "active" : "on hold",

  //     // rating
  //     rating: {
  //       average: item.rating || 0,
  //       count: item.reviews?.length || 0,
  //     },

  //     // dates
  //   };
  // };

  try {
    // const products = await Products.find();

    // const response = await fetch(
    //   "https://dummyjson.com/products?limit=0&skip=30"
    // );
    // const data = await response.json();
    // const productsData = data.products.map((item) => {
    //   const data = mapDummyProduct(item);
    //   return data;
    // });
    // console.log(productsData);
    // const newData = await Products.insertMany(productsData);
    // await newData.save();

    // res.send(newData);

    // const categories = await Products.distinct("category");
    // res.json(categories);
    const products = await Products.find();
    res.json(products);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
};
