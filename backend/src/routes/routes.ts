import express from "express";
import { getAllProducts, getProductById } from "../controllers/productController";
import { addToCart, checkout, getCart, removeFromCart } from "../controllers/cartController";
import { getUserOrders, placeOrder } from "../controllers/orderController";
import { logout, signin, signup } from "../controllers/authController";
import { getUserProfile } from "../controllers/userController";
import {authMiddleware} from "../middlewares/middleware";

const router = express.Router();

// 👤 Auth Routes
router.post("/signup", signup);
router.post("/login",  signin);
router.post("/logout", logout);
router.get("/profile", getUserProfile);


// 📦 Product Routes
router.get("/products" ,  getAllProducts);
//Bug
router.get("/products/:productId",  getProductById);

// 🛒 Cart Routes
router.post("/cart/add" ,  addToCart);
router.get("/cart",  getCart);
router.delete("/cart/remove/:id",removeFromCart);
router.post("/cart/checkout", checkout);

// 🛍 Order Routes
router.post("/order",   placeOrder);
router.get("/orders" ,  getUserOrders);





export default router;
