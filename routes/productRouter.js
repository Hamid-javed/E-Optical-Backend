const router = require("express").Router();
const productControl = require("../controller/productControl");
const { verifyUserToken } = require("../middlewares/authUser");
const { images } = require("../middlewares/images");


router.post("/add-product", images, productControl.addProduct);//fixed
router.post("/update-product/:productId", images, productControl.updateProduct);//fixed
router.delete("/delete-product/:productId", productControl.deleteProduct);//fixed
router.get("/category/:category", productControl.getProductsByCategory);//fixed
router.get("/featured", productControl.featured);//fixed
router.get("/get/:productId", productControl.getSingle);//fixed
router.get("/search", productControl.search);//fixed
router.get("/cart", productControl.getCart);//fixed
router.post("/cart-product/:productId", productControl.addToCart);//fixed
router.delete("/cart-product/:productId", productControl.removeFromCart);//fixed
router.post("/buy-cart", productControl.buyCart);//fixed
router.get("/get-order", productControl.getMyOrder);//fixed
router.get("/wishlist", productControl.getWishlistProduct)//fixed
router.post("/wishlist/:productId", productControl.addProductTWoishlist);//fixed
router.delete("/wishlist/:productId", productControl.removeProductFromWishlist);//fixed
router.post("/review/:productId", productControl.addReview);//fixed
router.delete("/review/:productId/:reviewId", productControl.deleteReview);//fixed
router.get("/:productId/reviews", productControl.getAllReviews);
router.put("/reviews/:reviewId", verifyUserToken, productControl.updateReview);




module.exports = router;
