"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
// import mongoose, { Schema, Document } from "mongoose";
const zod_1 = require("zod");
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
exports.productSchema = zod_1.z.object({
    category: zod_1.z.enum([
        "Processor",
        "Motherboard",
        "RAM",
        "Accessories",
        "Graphic Card",
    ]),
    brand: zod_1.z.string().min(1, "Brand is required"),
    model: zod_1.z.string().min(1, "Model is required"),
    price: zod_1.z.number().min(1, "Price must be greater than 0"),
    stock: zod_1.z.number().min(0, "Stock cannot be negative"),
    images: zod_1.z.array(zod_1.z.string().url("Invalid image URL")).optional(),
    specifications: zod_1.z.record(zod_1.z.any()).optional(),
});
