import { Request, Response } from "express";
import { User } from "../models/userModel";
import { Order } from "../models/orderModel"; // Ensure you have an Order model

// 🧑‍💼 Get User Profile
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
       res.status(404).json({ error: "User not found" });
    }
     res.status(200).json(user);
  } catch (error) {
     res.status(500).json({ error: "Error fetching user profile" });
  }
};

// 🛒 Get User Purchase History
export const getPurchase = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    // Fetch all orders placed by the user
    const orders = await Order.find({ userId }).populate("items.productId");

    if (!orders || orders.length === 0) {
       res.status(404).json({ message: "No purchase history found" });
    }

     res.status(200).json(orders);
  } catch (error) {
     res
      .status(500)
      .json({ message: "Error fetching purchase history", error });
  }
};
