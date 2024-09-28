const Cart = require("../model/cartSchema");
const Order = require("../model/orderSchema");
const Product = require("../model/productSchema");
const User = require("../model/userSchema");
const Wish = require("../model/wishSchema")
const { v4: uuidv4 } = require("uuid");
const cloudinary = require('../config/cloudinaryConfig')
const nodemailer = require('nodemailer');
require('dotenv').config();

//Add new product
exports.addProduct = async (req, res) => {
  try {
    const { name, description, category, colors, size, stock, price } = req.body;

    if (!name || !description || !category || !colors || !size || !stock || !price) {
      return res.status(400).json({ message: 'All fileds are required.' });
    }

    const imageUrls = req.files.map(file => file.path);

    // Create a new product
    const newProduct = new Product({
      name,
      description,
      category,
      colors: JSON.parse(colors),
      size,
      stock,
      price,
      images: imageUrls,
    });

    const savedProduct = await newProduct.save();
    res.status(200).json({ message: 'Product added successfully!', product: savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

//Update the product
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, category, colors, size, stock, price, imagesToDelete } = req.body;

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Update fields only if they are provided
    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.colors = colors ? JSON.parse(colors) : product.colors;
    product.size = size || product.size;
    product.stock = stock !== undefined ? stock : product.stock;
    product.price = price || product.price;

    product.images = product.images.filter(img => !imagesToDelete.includes(img));

    // Handle image additions (if new images are uploaded)
    if (req.files && req.files.length > 0) {
      const newImageUrls = req.files.map(file => file.path);
      product.images.push(...newImageUrls);
    }

    const updatedProduct = await product.save();
    res.status(200).json({ message: 'Product updated successfully!', product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

//Delete a specfic Product
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({ message: "ProductId not found!" })
    }
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(400).json({ message: "Product not found!" })
    }
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted successfully!" })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Get Products by Category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    // Find products matching the given category
    const products = await Product.find({ category });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found in this category" });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.featured = async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $group: { _id: "$category" } },
      { $limit: 10 },
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
    const product = await Product.findOne({ _id: productId })
    if (!product) return res.status(400).json({ message: "product not found" });
    res.status(200).json(product);
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
    const { lense, right, rightAxis, left, leftAxis } = req.body;
    const { productId } = req.params;
    const { cartUUID } = req.cookies;
    if (!productId) {
      res.status(404).json({ mesage: "No products Found!" })
    }
    let cart;
    if (!cartUUID) {
      const newUUID = uuidv4();
      cart = new Cart({
        cartUUID: newUUID,
        items: [],
        totalPrice: 0,
        totalProduct: 0,
      });
      await cart.save();
      res.cookie("cartUUID", newUUID, {
        httpOnly: true,
        path: "/",
        sameSite: "None",
        secure: true,
      });
    } else {
      cart = await Cart.findOne({ cartUUID });
      if (!cart) {
        return res
          .status(404)
          .json({ message: `Cart with UUID ${cartUUID} not found!` });
      }
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: `Product with ID ${productId} not found!` });
    }
    let newPrice = product.price;
    if (lense === "digitalScreenLense") {
      newPrice += 1000;
      cart.items.push(product._id);
      cart.totalProduct = cart.items.length
      cart.totalPrice += newPrice;
    } else if (lense === "transitionLense") {
      newPrice += 1250;
      cart.items.push(product._id);
      cart.totalProduct = cart.items.length
      cart.totalPrice += newPrice;
    } else if (lense === "transitionAnddigital") {
      newPrice += 2000;
      cart.items.push(product._id);
      cart.totalProduct = cart.items.length
      cart.totalPrice += newPrice;
    } else {
      cart.items.push(product._id);
      cart.totalProduct = cart.items.length
      cart.totalPrice += product.price;
    }
    const deliveryCharge = 150;
    cart.totalPrice += deliveryCharge;
    if (right || rightAxis || left || leftAxis) {
      const message = {
        productName: product.name,
        right,
        rightAxis,
        left,
        leftAxis
      }
      cart.message.push(message)
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
};

exports.getCart = async (req, res) => {
  try {
    const { cartUUID } = req.cookies;
    if (!cartUUID) {
      return res.status(404).json({ message: "No cart Found!" });
    }
    const cart = await Cart.findOne({ cartUUID: cartUUID });
    const product = cart.items;
    const products = await Product.find({ _id: { $in: product } });
    res.status(200).json({
      products: products,
      totalPrice: cart.totalPrice,
      totalProduct: cart.totalProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { cartUUID } = req.cookies;
    const { productId } = req.params;
    const cart = await Cart.findOne({ cartUUID: cartUUID });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found!" });
    }
    const productToRemove = cart.items.find((items) => {
      return items.toString() === productId;
    });
    if (!productToRemove) {
      return res.status(404).json({ message: "Product not found in cart!" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found in database!" });
    }
    cart.items = cart.items.filter((item) => item.toString() !== productId);
    cart.totalProduct = cart.items.length;
    cart.totalPrice -= product.price;
    await cart.save();
    res.status(200).json({
      message: "Product removed from cart!",
    });
  } catch (error) {
    res.status(501).json({
      error: error.message,
    });
  }
};


exports.buyCart = async (req, res) => {
  try {
    const { cartUUID } = req.cookies;
    const { firstName, lastName, address, city, email, number, zip, country } = req.body;

    if (!firstName || !lastName || !address || !city || !email || !zip || !number || !country) {
      return res.status(400).json({ message: "All shipping and payment fields are required." });
    }

    const cart = await Cart.findOne({ cartUUID });
    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "Cart is empty!" });
    }
    const products = await Product.find({ _id: { $in: cart.items } });

    for (const product of products) {
      if (product.stock <= 0) {
        return res.status(400).json({ message: `Product ${product.name} is out of stock!` });
      }
    }

    for (const product of products) {
      product.stock -= 1;
      await product.save();
    }

    // Create an order
    const order = new Order({
      cartUUID: cartUUID,
      products: products.map(product => product._id),
      message: cart.message,
      items: cart.items,
      totalAmount: cart.totalPrice,
      shippingAddress: {
        firstName,
        lastName,
        address,
        city,
        email,
        number,
        zip,
        country,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Save the order
    await order.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.Email,
        pass: process.env.Password,
      },
    });

    const productDetails = products.map(product => `
      <div>
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <img src="${product.images[0]}" alt="${product.name}" style="width:150px; height:auto;" />
      </div>
    `).join('<hr>');

    // Email options
    const mailOptions = {
      from: process.env.Email,
      to: email,
      subject: 'Your Order Details',
      html: `
        <h2>Thank you for your purchase!</h2>
        <p>Hello ${firstName} ${lastName},</p>
        <p>Here are the details of the products you purchased:</p>
        ${productDetails}
        <h3>Total Amount: $${cart.totalPrice}</h3>
        <p>Thanks For Shopping!.</p>
      `,
    };

    transporter.verify(function (error, success) {
      if (error) {
        console.log('SMTP connection error:', error);
      } else {
        console.log('SMTP server is ready to take our messages');
      }
    });

    await transporter.sendMail(mailOptions)
      .then(() => {
        console.log('Order confirmation email sent successfully.');
      })
      .catch((error) => {
        console.error('Failed to send order confirmation email:', error.message);
      });

    cart.items = [];
    cart.message = [];
    cart.totalProduct = 0;
    cart.totalPrice = 0;
    await cart.save();

    return res.status(200).json({
      message: "Order placed successfully! A confirmation email has been sent.",
      order,
    });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


exports.getMyOrder = async (req, res) => {
  try {
    const { cartUUID } = req.cookies;
    const userOrders = await Order.findOne({ cartUUID });
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
    const { cartUUID } = req.cookies;
    const { productId } = req.params;
    if (!cartUUID) {
      return res.status(404).json({ message: "UUID not found!" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    let wishList = await Wish.findOne({ cartUUID: cartUUID });
    if (!wishList) {
      wishList = new Wish({
        items: [productId],
        cartUUID: cartUUID,
      });
    } else {
      const isProductInWishlist = wishList.items.includes(productId);
      if (!isProductInWishlist) {
        wishList.items.push(productId);
      } else {
        return res.status(400).json({ message: "Product is already in the wishlist!" });
      }
    }
    await wishList.save();
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

exports.getWishlistProduct = async (req, res) => {
  try {
    const { cartUUID } = req.cookies;
    if (!cartUUID) {
      return res.status(404).json({ message: "CartUUID not found!" });
    }

    const wishList = await Wish.findOne({ cartUUID: cartUUID }).populate('items').exec();
    if (!wishList) {
      return res.status(400).json({ message: "No product found in wishlist!" });
    }

    res.status(200).json(wishList);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.removeProductFromWishlist = async (req, res) => {
  try {
    const { cartUUID } = req.cookies;
    if (!cartUUID) {
      return res.status(404).json({ message: "CartUUID not found!" });
    }

    const { productId } = req.params;
    if (!productId) {
      return res.status(404).json({ message: "Product ID not found!" }); // Added return
    }

    const wishList = await Wish.findOne({ cartUUID: cartUUID });
    if (!wishList) {
      return res.status(404).json({ message: "Wishlist not found!" }); // Check if wishlist exists
    }

    wishList.items = wishList.items.filter(item => item.toString() !== productId);
    await wishList.save();

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
  try {
    const { rating, review, name, email } = req.body;
    const { productId } = req.params;

    if (!rating || !review || !name || !email) {
      return res.status(400).json({ message: "Please provide all details" });
    }

    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingReview = product.reviews.find((r) => r.email === email);
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this product" });
    }
    const userReview = {
      rating,
      review,
      name,
      email
    };
    product.reviews.unshift(userReview);
    await product.save();
    res.status(200).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


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
  try {
    const { reviewId } = req.params;
    const { productId } = req.params;
    if (!productId) {
      return res.status(404).json({message: ""})
    }
    const product = await Product.findById(productId)
    const reviewIndex = product.reviews.findIndex(review => review._id.toString() === reviewId)
    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Review not found!" });
    }
    product.reviews.splice(reviewIndex, 1)
    await product.save();
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
