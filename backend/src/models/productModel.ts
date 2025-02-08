// import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";

// // Interface for Type Safety
// export interface IProduct extends Omit<Document, "model"> {
//   category:
//     | "Processor"
//     | "Motherboard"
//     | "RAM"
//     | "Accessories"
//     | "Graphic Card";
//   brand: string;
//   model: string; 
//   description?: string;
//   price: number;
//   stock: number;
//   images: string[];
//   specifications: Record<string, any>;
// }

// // Mongoose Schema
// const ProductSchema: Schema = new Schema(
//   {
//     category: {
//       type: String,
//       enum: ["Processor", "Motherboard", "RAM", "Accessories", "Graphic Card"],
//       required: true,
//     },
//     brand: { type: String, required: true },
//     model: { type: String, required: true }, // ✅ No conflict now
//     description: { type: String },
//     price: { type: Number, required: true },
//     stock: { type: Number, required: true },
//     images: [{ type: String }],
//     specifications: { type: Object, default: {} },
//   },
//   { timestamps: true }
// );

// export const Product = mongoose.model<IProduct>("Product", ProductSchema);

// ✅ Zod Validation Schema
export const productSchema = z.object({
  category: z.enum([
    "Processor",
    "Motherboard",
    "RAM",
    "Accessories",
    "Graphic Card",
  ]),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  stock: z.number().min(0, "Stock cannot be negative"),
  images: z.array(z.string().url("Invalid image URL")).optional(),
  specifications: z.record(z.any()).optional(),
});
