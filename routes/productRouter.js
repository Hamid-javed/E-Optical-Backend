const router = require("express").Router();
const productControl = require("../controller/productControl");
const { verifyUserToken } = require("../middlewares/authUser");
const { images } = require("../middlewares/images");


router.post("/add-product", images, productControl.addProduct);//fixed
router.get("/categories", productControl.getCategories);
router.get("/featured", productControl.featured);
router.get("/get/:productId", productControl.getSingle);//fix
router.get("/search", productControl.search);
router.get("/cart", productControl.getCart);//fixed
router.post("/cart-product/:productId", productControl.addToCart);//fixed
router.delete("/cart-product/:productId", productControl.removeFromCart);
router.post("/buy-cart", productControl.buyProduct);//fixed
router.get("/get-order", productControl.getMyOrder);//fixed
router.post("/wishlist/:productId", verifyUserToken, productControl.addProductTWoishlist);
router.delete("/wishlist/:productId", verifyUserToken, productControl.removeProductTWoishlist);
router.get("/:productId/reviews", productControl.getAllReviews);
router.post("/reviews/:productId", productControl.addReview);//fixed
router.put("/reviews/:reviewId", verifyUserToken, productControl.updateReview);
router.delete("/reviews/:reviewId", verifyUserToken, productControl.deleteReview);




module.exports = router;
