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
        image: { type : String , required : false},
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

