import { Request, Response } from "express";
import { Product } from "../models/productModel";
import { Order } from "../models/orderModel";
import { Cart } from "../models/cartModel";

interface AuthRequest extends Request {
  user?: { id: string };
}


export const placeOrder = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { paymentMethod, shippingAddress } = req.body;
    const userId = req.user.id;

    // Fetch user's cart
    const cart = await Cart.findOne({ userId })
      .populate("items.productId")
      .exec();
    if (!cart || !cart.items || cart.items.length === 0) {
      // ✅ Ensure items exist
      res.status(400).json({ message: "Cart is empty" });
      return;
    }

    // Check stock availability
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        res.status(400).json({
          message: `Insufficient stock for ${product?.model || "product"}`,
        });
        return;
      }
    }

    // Deduct stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    // Create order
    const newOrder = new Order({
      userId,
      items: cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: (item.productId as any).price, 
      })),
      totalAmount: cart.items.reduce(
        (acc, item) => acc + (item.productId as any).price * item.quantity,
        0
      ),
      paymentMethod,
      shippingAddress,
      status: "Pending",
    });

    await newOrder.save();

    await Cart.findOneAndUpdate({ userId }, { items: [] });

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error: any) {
    console.error("Error placing order:", error.message);
    res.status(500).json({ message: "Error placing order", error });
  }
};

// 📜 Get User Orders
export const getUserOrders = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const orders = await Order.find({ userId: req.user.id })
      .populate("items.productId")
      .exec();

    if (!orders.length) {
      res.status(404).json({ message: "No orders found" });
      return;
    }

    res.status(200).json(orders);
  } catch (error: any) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: "Error fetching orders", error });
  }
};
