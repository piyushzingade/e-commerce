"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const cartController_1 = require("../controllers/cartController");
const orderController_1 = require("../controllers/orderController");
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// 👤 Auth Routes
router.post("/signup", authController_1.signup);
router.post("/login", authController_1.signin);
router.post("/logout", authController_1.logout);
router.get("/profile", userController_1.getUserProfile);
// 📦 Product Routes
router.get("/products", productController_1.getAllProducts);
//Bug
router.get("/products/:productId", productController_1.getProductById);
// 🛒 Cart Routes
router.post("/cart/add", cartController_1.addToCart);
router.get("/cart", cartController_1.getCart);
router.delete("/cart/remove/:id", cartController_1.removeFromCart);
router.post("/cart/checkout", cartController_1.checkout);
// 🛍 Order Routes
router.post("/order", orderController_1.placeOrder);
router.get("/orders", orderController_1.getUserOrders);
exports.default = router;
