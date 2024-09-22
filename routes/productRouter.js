const router = require("express").Router();
const productControl = require("../controller/productControl");
const { verifyUserToken } = require("../middlewares/authUser");
const { images } = require("../middlewares/images");


router.post("/add-product", images, productControl.addProduct);
router.post("/add-variants/:productId", productControl.addVariants);
router.get("/categories", productControl.getCategories);
router.get("/featured", productControl.featured);
router.get("/get/:productId", verifyUserToken, productControl.getSingle);
router.get("/search", productControl.search);
router.get("/cart", productControl.getCart);
router.post("/cart-product", productControl.addToCart);
router.delete("/cart-product/:productId", productControl.removeFromCart);
router.post("/buy-cart", productControl.buyProduct);
router.get("/get-orders", verifyUserToken, productControl.getMyOrders);
router.post("/wishlist/:productId", verifyUserToken, productControl.addProductTWoishlist);
router.delete("/wishlist/:productId", verifyUserToken, productControl.removeProductTWoishlist);
router.get("/:productId/reviews", productControl.getAllReviews);
router.post("/:productId/reviews", verifyUserToken, productControl.addReview);
router.put("/reviews/:reviewId", verifyUserToken, productControl.updateReview);
router.delete("/reviews/:reviewId", verifyUserToken, productControl.deleteReview);




module.exports = router;
