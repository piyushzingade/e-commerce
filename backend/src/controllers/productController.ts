import { Request, Response } from "express";
import { Products } from "../data"; // Import the product data directly

// Get all products
export const getAllProducts = (req: Request, res: Response) => {
  try {
    res.status(200).json(Products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get product by ID
export const getProductById = (req: Request, res: Response) => {
  try {
    const product = Products.find((p) => p.model === req.params.id);
    if (!product) {
       res.status(404).json({ message: "Product not found" });
       return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};
