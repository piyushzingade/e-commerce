import express from "express";
import { getAllProducts, getProductById } from "../controllers/productController";
import { addToCart, checkout, getCart, removeFromCart } from "../controllers/cartController";
import { getUserOrders, placeOrder } from "../controllers/orderController";
// import { createRazorpayOrder, verifyPayment } from "../controllers/paymentController";
import { signin, signup } from "../controllers/authController";
import { getUserProfile } from "../controllers/userController";
import authMiddleware from "../middlewares/middleware";

const router = express.Router();

// 📦 Product Routes
router.get("/products", authMiddleware, getAllProducts);
router.get("/products/:id", authMiddleware, getProductById);

// 🛒 Cart Routes
router.post("/cart/add", authMiddleware, addToCart);
router.get("/cart", authMiddleware, getCart);
router.delete("/cart/remove/:id", authMiddleware, removeFromCart);
router.post("/cart/checkout", authMiddleware, checkout);

// 🛍 Order Routes
router.post("/order", authMiddleware ,  placeOrder);
router.get("/orders",authMiddleware ,  getUserOrders);

// // 💳 Payment Routes (Razorpay)
// router.post("/payment/create", createRazorpayOrder);
// router.post("/payment/verify", verifyPayment);

// 👤 Auth Routes
router.post("/auth/signup", signup);
router.post("/auth/login", signin);
router.get("/auth/profile", getUserProfile);

export default router;
