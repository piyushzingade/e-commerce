// import Razorpay from "razorpay";
// import { Request, Response } from "express";
// import dotenv from "dotenv";
// import crypto from "crypto";

// dotenv.config();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// // Create Razorpay Order
// export const createRazorpayOrder = async (req: Request, res: Response) => {
//   const { amount, currency = "INR" } = req.body;
//   try {
//     const options = {
//       amount: amount * 100,
//       currency,
//       receipt: `order_rcpt_${Date.now()}`,
//     };
//     const order = await razorpay.orders.create(options);
//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating Razorpay order", error });
//   }
// };

// // Verify Payment
// export const verifyPayment = async (req: Request, res: Response) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;
//   try {
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest("hex");

//     if (expectedSignature === razorpay_signature) {
//       res
//         .status(200)
//         .json({
//           message: "Payment successful",
//           paymentId: razorpay_payment_id,
//         });
//     } else {
//       res
//         .status(400)
//         .json({ message: "Invalid signature, payment verification failed" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error verifying payment", error });
//   }
// };
