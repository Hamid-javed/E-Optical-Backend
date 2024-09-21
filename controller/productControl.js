const Category = require("../model/categorySchema");
const Cart = require("../model/cartSchema");
const Order = require("../model/orderSchema");
const Product = require("../model/productSchema");
const User = require("../model/userSchema");
const { v4: uuidv4 } = require('uuid');

exports.addProduct = async (req, res) => {
  try {
    const { name, description, category, colors, size, stock, price } = req.body;

    // let imagePath;
    // if (req.file) {
    //   imagePath = req.file.path;
    // }
    const newProduct = new Product({
      name,
      description,
      category,
      colors,
      size,
      stock,
      price,
    });
    const savedProduct = await newProduct.save();
    res.status(200).json({ message: "Product added successfuly!", product: savedProduct });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.addImagesToProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    let imagePath;
    if (req.file) {
      imagePath = req.file.path;
    }
    const product = await Product.findById(productId)
    product.images.push(imagePath)
    product.save()
    res.status(200).json({ message: "Images added in product!", product: product })

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}


exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  const categoryData = categories.map((category) => {
    return { name: category.name, productCount: category.productCount };
  });
  res.json(categoryData);
};

exports.featured = async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $group: { _id: "$category" } },
      { $limit: 7 },
    ]).exec();
    const productPromises = categories.map((category) => {
      return Product.findOne({ category: category._id }).exec();
    });
    const featuredProducts = await Promise.all(productPromises);
    res.status(200).json(featuredProducts);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const product = await Product.findOne({ _id: productId }).populate({
      path: "reviews.user",
      select: "name email",
    });
    if (!product) return res.status(400).json({ message: "product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.search = async (req, res) => {
  try {
    const {
      query = "",
      page = 1,
      limit = 10,
      category = "",
      sortfield = "",
      sortorder = "asc",
    } = req.query;
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;
    const regex = query ? new RegExp(query, "i") : new RegExp("");

    const searchCriteria = query
      ? {
        $or: [{ name: { $regex: regex } }, { category: { $regex: regex } }],
      }
      : {};
    let sortF;
    if (sortfield === "rating") {
      sortF = "rating";
    }

    const validSortFields = ["rating"];
    const validSortOrder = ["asc", "desc"];
    let sortCriteria = {};

    if (
      sortfield &&
      validSortFields.includes(sortF) &&
      validSortOrder.includes(sortorder)
    ) {
      sortCriteria[sortF] = sortorder === "asc" ? 1 : -1;
    } else {
      sortCriteria = { _id: 1 };
    }

    const products = await Product.find(searchCriteria)
      .sort(sortCriteria)
      .skip(skip)
      .limit(pageSize);

    const totalCount = await Product.countDocuments(searchCriteria);

    res.status(200).json({
      page: pageNumber,
      limit: pageSize,
      totalResults: totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      results: products,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};


exports.addToCart = async (req, res) => {
  try {
    const { productIDS } = req.body;
    const { cartUUID } = req.cookies;
    if (!productIDS) {
      res.status(404).json({ mesage: "No products Found!" })
    }
    let cart;
    if (!cartUUID) {
      const newUUID = uuidv4();
      cart = new Cart({
        cartUUID: newUUID,
        items: [],
        total: 0
      });
      await cart.save()
      res.cookie('cartUUID', newUUID, {
        httpOnly: true,
        path: '/',
        sameSite: 'None',
        secure: true
      });
    } else {
      cart = await Cart.findOne({ cartUUID });
      if (!cart) {
        return res.status(404).json({ message: `Cart with UUID ${cartUUID} not found!` });
      }
    }
    for (let index = 0; index < productIDS.length; index++) {
      const product = await Product.findById(productIDS[index]);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${productIDS[index]} not found!` });
      }
      const productExists = cart.items.some(item => item.toString() === product._id.toString());
      if (!productExists) {
        cart.items.push(product._id);
      }
      cart.total = cart.items.length
    }
    await cart.save()
    return res.status(200).json({
      message: "Products added to cart successfully!",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}


exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.id;
    const { productId } = req.params;
    const userCart = await Cart.findOne({ user: userId });
    if (!userCart) {
      return res.status(404).json({ message: "Cart not found!" });
    }
    const productToRemove = userCart.items.find((items) => {
      return items.product.toString() === productId;
    });
    if (!productToRemove) {
      return res.status(404).json({ message: "Product not found in cart!" });
    }
    userCart.items = userCart.items.filter(
      (item) => item.product.toString() === productId
    );
    await userCart.save();
    res.status(200).json({
      message: "Product removed from cart!",
    });
  } catch (error) {
    res.status(501).json({
      error: error.message,
    });
  }
};

exports.buyProduct = async (req, res) => {
  try {
    const userId = req.id;
    const { cartId, productId } = req.params;
    const { street, city, state, zip, country, paymentMethod } = req.body;
    if (!street) {
      return res.status(400).json({ message: "Street is required." });
    }
    if (!city) {
      return res.status(400).json({ message: "City is required." });
    }
    if (!state) {
      return res.status(400).json({ message: "State is required." });
    }
    if (!zip) {
      return res.status(400).json({ message: "Zip code is required." });
    }
    if (!country) {
      return res.status(400).json({ message: "Country is required." });
    }
    if (!paymentMethod) {
      return res.status(400).json({ message: "Payment method is required." });
    }
    const userCart = await Cart.findById({ _id: cartId });
    if (!userCart) {
      return res.status(404).json({ message: "No such cart found!" });
    }
    const productInCart = userCart.items.find(
      (item) => item.product.toString() === productId
    );
    if (!productInCart) {
      return res
        .status(404)
        .json({ message: "No such product found in the cart!" });
    }
    const shippingAddress = {
      street,
      city,
      state,
      zip,
      country,
    };
    const userOrder = await Order.create({
      user: userId,
      items: [productInCart],
      totalAmount: productInCart.price * productInCart.quantity,
      paymentMethod: paymentMethod,
      shippingAddress,
    });
    const user = await User.findById(userId);
    user.orders.push(userOrder);
    user.save();
    res.status(200).json({ message: "Order placed successfullu!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.id;
    const userOrders = await Order.find({ user: userId });
    res.status(200).json({
      userOrders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.addProductTWoishlist = async (req, res) => {
  try {
    const userId = req.id;
    const { productId } = req.params;
    if (!productId) {
      res.status(404).json({ message: "Product not found!" });
    }
    const product = await Product.findById(productId);
    const user = await User.findById(userId);
    await user.wishlist.push(product);
    user.save();
    res.status(200).json({
      message: "Product added to wishlist!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.removeProductTWoishlist = async (req, res) => {
  try {
    const userId = req.id;
    const { productId } = req.params;
    if (!productId) {
      res.status(404).json({ message: "Product not found!" });
    }
    const user = await User.findById(userId);
    user.wishlist = user.wishlist.filter(
      (product) => product.toString() !== productId
    );
    await user.save();
    res.status(200).json({
      message: "Product removed from wishlist!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.addReview = async (req, res) => {
  const { rating, review, productId } = req.body;
  const userId = req.user._id;

  try {
    // Check if the user has purchased the product
    const hasPurchased = await Order.findOne({
      user: userId,
      "items.product": productId,
      status: { $in: ["Shipped", "Delivered"] },
    });

    if (!hasPurchased) {
      return res
        .status(403)
        .json({ message: "You can only review products you have purchased." });
    }

    const newReview = new Review({
      rating,
      review,
      user: userId,
      product: productId,
    });

    await newReview.save();
    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update a Review - Only if the user owns the review
exports.updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, review } = req.body;
  const userId = req.user._id;

  try {
    const existingReview = await Review.findById(reviewId);

    if (!existingReview) {
      return res.status(404).json({ message: "Review not found." });
    }

    if (existingReview.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You can only update your own review." });
    }

    existingReview.rating = rating;
    existingReview.review = review;
    await existingReview.save();

    res
      .status(200)
      .json({ message: "Review updated successfully", review: existingReview });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a Review - Only if the user owns the review
exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user._id;

  try {
    const existingReview = await Review.findById(reviewId);

    if (!existingReview) {
      return res.status(404).json({ message: "Review not found." });
    }

    if (existingReview.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You can only delete your own review." });
    }

    await existingReview.remove();
    res.status(200).json({ message: "Review deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get All Reviews for a Product
exports.getAllReviews = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ product: productId }).populate(
      "user",
      "name"
    );
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
