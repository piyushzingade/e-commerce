import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";

// Interface for Type Safety
export interface IOrder extends Document {
  userId?: mongoose.Schema.Types.ObjectId; // Optional if not logged in
  items: {
    productId: mongoose.Schema.Types.ObjectId;
    image: string
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  shippingAddress: {
    // ✅ Rename to shippingAddress
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  paymentStatus: "Pending" | "Paid" | "Failed";
}

// Mongoose Schema
const OrderSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        image: { type : String , required : true},
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
      // ✅ Updated field name
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, default: "India" },
    },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", OrderSchema);

// Zod Schema
export const orderSchema = z.object({
  userId: z.string().optional(), // Optional if no user login
  items: z.array(
    z.object({
      productId: z.string().min(1, "Product ID is required"),
      image:z.string(),
      quantity: z.number().min(1, "Quantity must be at least 1"),
      price: z.number().min(1, "Price must be greater than 0"),
    })
  ),
  totalAmount: z.number().min(1, "Total amount must be greater than 0"),
  shippingAddress: z.object({
    // ✅ Matches the mongoose schema
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(1, "ZIP code is required"),
    country: z.string().default("India"),
  }),
});
