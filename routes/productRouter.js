const router = require("express").Router();
const productControl = require("../controller/productControl");
const { verifyUserToken } = require("../middlewares/authUser");
const { images } = require("../middlewares/images");


router.post("/add-product", images, productControl.addProduct);//to fix
router.get("/category/:category", productControl.getProductsByCategory);//fixed
router.get("/featured", productControl.featured);//fixed
router.get("/get/:productId", productControl.getSingle);//fixed
router.get("/search", productControl.search);//fixed
router.get("/cart", productControl.getCart);//fixed
router.post("/cart-product/:productId", productControl.addToCart);//fixed
router.delete("/cart-product/:productId", productControl.removeFromCart);//fixed
router.post("/buy-cart", productControl.buyProduct);//fixed
router.get("/get-order", productControl.getMyOrder);//fixed
router.get("/wishlist", productControl.getWishlistProduct)
router.post("/wishlist/:productId", productControl.addProductTWoishlist);//fixed
router.delete("/wishlist/:productId", verifyUserToken, productControl.removeProductTWoishlist);
router.get("/:productId/reviews", productControl.getAllReviews);
router.post("/reviews/:productId", productControl.addReview);//fixed
router.put("/reviews/:reviewId", verifyUserToken, productControl.updateReview);
router.delete("/reviews/:reviewId", verifyUserToken, productControl.deleteReview);




module.exports = router;
