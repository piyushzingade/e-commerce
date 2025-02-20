import express from "express";
import { getAllProducts, getProductById } from "../controllers/productController";
import { addToCart, checkout, getCart, removeFromCart } from "../controllers/cartController";
import { getUserOrders, placeOrder } from "../controllers/orderController";
// import { createRazorpayOrder, verifyPayment } from "../controllers/paymentController";
import { logout, signin, signup } from "../controllers/authController";
import { getUserProfile } from "../controllers/userController";
import {authMiddleware} from "../middlewares/middleware";

const router = express.Router();

// 👤 Auth Routes
router.post("/signup", signup);
router.post("/login", signin);
router.post("/logout" , logout)
router.get("/profile", authMiddleware , getUserProfile);


// 📦 Product Routes
router.get("/products" ,  getAllProducts);
//Bug
router.get("/products/:productId", authMiddleware, getProductById);

// 🛒 Cart Routes
router.post("/cart/add" ,  addToCart);
router.get("/cart", getCart);
router.delete("/cart/remove/:id", removeFromCart);
router.post("/cart/checkout", checkout);

// 🛍 Order Routes
router.post("/order", authMiddleware ,  placeOrder);
router.get("/orders",authMiddleware ,  getUserOrders);

// // 💳 Payment Routes (Razorpay)
// router.post("/payment/create", createRazorpayOrder);
// router.post("/payment/verify", verifyPayment);




export default router;
