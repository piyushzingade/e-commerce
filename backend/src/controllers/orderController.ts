import { Request, Response } from "express";
import { Product } from "../models/productModel";
import { Order } from "../models/orderModel";
import { Cart } from "../models/cartModel";

interface AuthRequest extends Request {
  user?: { id: string };
}


export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { paymentMethod, shippingAddress } = req.body;

    // Fetch cart (global cart for all users — no user filter)
    const cart = await Cart.findOne().populate("items.productId").exec();
    if (!cart || !cart.items || cart.items.length === 0) {
      res.status(400).json({ message: "Cart is empty" });
      return;
    }

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

    const newOrder = new Order({
      // No userId needed
      items: cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: (item.productId as any).price,
        image: (item.productId as any).image, // Add image field here
      })),
      totalAmount: cart.items.reduce(
        (acc, item) => acc + (item.productId as any).price * item.quantity,
        0
      ),
      paymentMethod,
      shippingAddress, // Correctly received
      status: "Pending",
    });

    await newOrder.save();

    // Clear cart after order
    await Cart.findOneAndUpdate({}, { items: [] });

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error: any) {
    console.error("Error placing order:", error.message);
    res.status(500).json({ message: "Error placing order", error });
  }
};



export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate("items.productId").exec();

    if (!orders.length) {
      res.status(404).json({ message: "No orders found" });
      return;
    }

    res.status(200).json({ orders }); // Wrap orders in an object

  } catch (error: any) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: "Error fetching orders", error });
  }
};
