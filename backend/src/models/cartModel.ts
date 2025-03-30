import mongoose, { Schema, Document, Types } from "mongoose";
import { z } from "zod";

// Interface for Type Safety
export interface ICart extends Document {
  userId: Types.ObjectId;
  items: { productId: Types.ObjectId; quantity: number }[];
}

// Mongoose Schema
const CartSchema: Schema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
  },
  { timestamps: true }
);

export const Cart = mongoose.model<ICart>("Cart", CartSchema);

// ✅ Zod Validation Schema
export const cartSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  items: z.array(
    z.object({
      productId: z.string().min(1, "Product ID is required"),
      quantity: z.number().min(1, "Quantity must be at least 1"),
    })
  ),
});
