"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const cartController_1 = require("../controllers/cartController");
const orderController_1 = require("../controllers/orderController");
// import { createRazorpayOrder, verifyPayment } from "../controllers/paymentController";
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const middleware_1 = __importDefault(require("../middlewares/middleware"));
const router = express_1.default.Router();
// 📦 Product Routes
router.get("/products", middleware_1.default, productController_1.getAllProducts);
router.get("/products/:id", middleware_1.default, productController_1.getProductById);
// 🛒 Cart Routes
router.post("/cart/add", middleware_1.default, cartController_1.addToCart);
router.get("/cart", middleware_1.default, cartController_1.getCart);
router.delete("/cart/remove/:id", middleware_1.default, cartController_1.removeFromCart);
router.post("/cart/checkout", middleware_1.default, cartController_1.checkout);
// 🛍 Order Routes
router.post("/order", middleware_1.default, orderController_1.placeOrder);
router.get("/orders", middleware_1.default, orderController_1.getUserOrders);
// // 💳 Payment Routes (Razorpay)
// router.post("/payment/create", createRazorpayOrder);
// router.post("/payment/verify", verifyPayment);
// 👤 Auth Routes
router.post("/auth/signup", authController_1.signup);
router.post("/auth/login", authController_1.signin);
router.get("/auth/profile", userController_1.getUserProfile);
exports.default = router;
