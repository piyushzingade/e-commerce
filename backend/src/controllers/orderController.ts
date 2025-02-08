import { Request, Response } from "express";
import { Order } from "../models/orderModel";
import { Cart } from "../models/cartModel";
import { Products } from "../data"; // Array of product objects

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { userId, paymentMethod, shippingAddress } = req.body;

    // Fetch user's cart
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
       res.status(400).json({ message: "Cart is empty" });
       return;
    }

    // Check stock availability
    for (const item of cart.items) {
      const product = Products.find(
        (p) => p.model === item.productId.toString()
      );
      if (!product || product.stock < item.quantity) {
         res.status(400).json({
          message: `Insufficient stock for ${product?.model || "product"}`,
        });
        return;
      }
    }

    // Deduct stock
    for (const item of cart.items) {
      const product = Products.find(
        (p) => p.model === item.productId.toString()
      );
      if (product) {
        product.stock -= item.quantity;
      }
    }

    // Create order
    const newOrder = new Order({
      userId,
      items: cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price:
          Products.find((p) => p.model === item.productId.toString())?.price ||
          0,
      })),
      totalAmount: cart.items.reduce((acc, item) => {
        const product = Products.find(
          (p) => p.model === item.productId.toString()
        );
        return acc + (product?.price || 0) * item.quantity;
      }, 0),
      paymentMethod,
      shippingAddress,
      status: "Pending",
    });

    await newOrder.save();

    // Clear cart
    await Cart.findOneAndUpdate({ userId }, { items: [] });

     res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
     res.status(500).json({ message: "Error placing order", error });
  }
};


export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ userId: req.query.userId }).populate(
      "items.productId"
    );
     res.status(200).json(orders);
  } catch (error) {
     res.status(500).json({ message: "Error fetching orders", error });
  }
};