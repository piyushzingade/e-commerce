import { Request, Response } from "express";
import { User } from "../models/userModel";
import { Order } from "../models/orderModel"; 


// Define an extended request type to include `user`
interface AuthRequest extends Request {
  user?: any;
}

// 🧑‍💼 Get User Profile
export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    // Ensure the user is authenticated
    if (!req.user || !req.user.id) {
       res.status(401).json({ error: "Unauthorized access" });
       return
    }

    // Fetch the user from the database, excluding the password
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
       res.status(404).json({ error: "User not found" });
       return
    }

    // Return the user profile data
     res.status(200).json(user);
  } catch (error: any) {
    console.error("Error fetching user profile:", error.message);
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
