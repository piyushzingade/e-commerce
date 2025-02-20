import { Request, Response } from "express";
import { Product } from "../models/productModel";

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    console.log("Requested Product ID:", productId);

    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (error: any) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ message: "Error fetching product" });
    return;
  }
};
