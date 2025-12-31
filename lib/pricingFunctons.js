function totalDiscount(regularDiscount = 0, saleDiscount = 0) {
  if (saleDiscount === 0) {
    return Number(regularDiscount.toFixed(2));
    //only regulardiscount
  } else if (saleDiscount > 0 && regularDiscount > 0) {
    const total = Number(regularDiscount) + Number(saleDiscount);
    return Number(total.toFixed(2));
    //Regular+sales
  } else {
    return 0;
  }
}

function finalAmount(basePrice, totalDiscount) {
  const discounted = (Number(basePrice) * Number(totalDiscount)) / 100;
  return Number(basePrice - discounted);
}

function calculateTotalPrice(items) {
  return items.map((item) => {
    return {
      Pname: item.product.name,
      Pid: item.product.productId,
      finalPrice: finalAmount(
        item.product.basePrice,
        totalDiscount(item.product.discountPercent, item.product.salePercent)
      ),
      qty: item.quantity,
    };
  });
}

function calculateTotalAmount(items) {
  return items.reduce((total, item) => {
    return total + item.finalPrice * item.qty;
  }, 0);
}

function finalprice(item, productsQuantity) {
  const singleItemPrice = finalAmount(
    item.basePrice,
    totalDiscount(item.discountPercent, item.salePercent)
  );
  const finalPrice = singleItemPrice * productsQuantity;
  return finalPrice;
}

export {
  totalDiscount,
  finalAmount,
  calculateTotalPrice,
  calculateTotalAmount,
  finalprice,
};
