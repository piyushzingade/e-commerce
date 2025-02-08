import { Request, Response } from "express";
import { Cart } from "../models/cartModel";
import { Products } from "../data";


export const addToCart = async (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;

  try {
    if (!userId || !productId || quantity <= 0) {
       res.status(400).json({ message: "Invalid input data" });
       return;
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const product = Products.find((p) => p.model === productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
     res.status(200).json(cart);
  } catch (error) {
     res.status(500).json({ message: "Error adding to cart", error });
  }
};

// 📦 Get cart items
export const getCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

     res.status(200).json(cart);
  } catch (error) {
     res.status(500).json({ message: "Error fetching cart", error });
  }
};


export const removeFromCart = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const { id: productId } = req.params;

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId } } },
      { new: true }
    );

    if (!cart) {
       res.status(404).json({ message: "Cart not found" });
       return;
    }

     res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
     res.status(500).json({ message: "Error removing item", error });
  }
};

// ✅ Checkout and place order
export const checkout = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    // Fetch the cart with product details populated
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || !cart.items || cart.items.length === 0) {
       res.status(400).json({ message: "Cart is empty" });
       return
    }

    // Calculate total price
    const totalAmount = cart.items.reduce((acc, item) => {
      const product = item.productId as any; // Type assertion for populated product
      return acc + (product.price || 0) * item.quantity;
    }, 0);

    // Create order object
    const order = {
      userId: cart.userId,
      items: cart.items,
      total: totalAmount,
      orderDate: new Date(),
    };

    // Clear the cart after checkout
    await Cart.findOneAndUpdate({ userId }, { items: [] });

     res
      .status(200)
      .json({ message: "Order placed successfully", order });
  } catch (error) {
     res.status(500).json({ message: "Error during checkout", error });
  }
};
