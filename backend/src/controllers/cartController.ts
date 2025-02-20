import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import { Cart } from "../models/cartModel";
import { Order } from "../models/orderModel";
import { Product } from "../models/productModel";

/**
 * @route POST /api/cart/add
 * @desc Add an item to the cart
 * @access Public
 */
export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || quantity <= 0) {
      res.status(400).json({ message: "Invalid input data" });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: "Invalid productId format" });
      return;
    }

    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ items: [] });
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        //@ts-ignore
        productId: new mongoose.Types.ObjectId(productId),
        quantity,
      });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error: any) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

/**
 * @route GET /cart
 * @desc Get the cart
 * @access Public
 */
export const getCart = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne().populate("items.productId");
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    res.status(200).json(cart);
  } catch (error: any) {
    console.error("Error fetching cart:", error.message);
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

/**
 * @route DELETE /cart/remove/:id
 * @desc Remove an item from the cart
 * @access Public
 */
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: "Invalid product ID" });
      return;
    }

    const cart = await Cart.findOneAndUpdate(
      {},
      {
        $pull: { items: { productId: new mongoose.Types.ObjectId(productId) } },
      },
      { new: true }
    );

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    res.status(200).json({ message: "Item removed", cart });
  } catch (error: any) {
    console.error("Error removing item from cart:", error.message);
    res.status(500).json({ message: "Error removing item", error });
  }
};

/**
 * @route POST /cart/checkout
 * @desc Checkout the cart and create an order
 * @access Public
 */
export const checkout = async (req: Request, res: Response) => {
  try {
    const { address } = req.body;
    if (
      !address ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.zip
    ) {
      res.status(400).json({ message: "Address is required" });
      return;
    }

    const cart = await Cart.findOne().populate("items.productId");
    if (!cart || !cart.items || cart.items.length === 0) {
      res.status(400).json({ message: "Cart is empty" });
      return;
    }

    const orderItems = cart.items.map((item) => {
      const product = item.productId as any;
      return {
        productId: product._id,
        quantity: item.quantity,
        price: product.price,
      };
    });

    const totalAmount = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const order = new Order({
      items: orderItems,
      totalAmount,
      address,
      orderDate: new Date(),
    });

    await order.save();
    await Cart.findOneAndUpdate({}, { items: [] });

    res.status(200).json({ message: "Order placed successfully", order });
  } catch (error: any) {
    console.error("Error during checkout:", error.message);
    res.status(500).json({ message: "Error during checkout", error });
  }
};
