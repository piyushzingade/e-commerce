"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.createRazorpayOrder = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
const razorpay = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// Create Razorpay Order
const createRazorpayOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, currency = "INR" } = req.body;
    try {
        const options = {
            amount: amount * 100,
            currency,
            receipt: `order_rcpt_${Date.now()}`,
        };
        const order = yield razorpay.orders.create(options);
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating Razorpay order", error });
    }
});
exports.createRazorpayOrder = createRazorpayOrder;
// Verify Payment
const verifyPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    try {
        const expectedSignature = crypto_1.default
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");
        if (expectedSignature === razorpay_signature) {
            res
                .status(200)
                .json({
                message: "Payment successful",
                paymentId: razorpay_payment_id,
            });
        }
        else {
            res
                .status(400)
                .json({ message: "Invalid signature, payment verification failed" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error verifying payment", error });
    }
});
exports.verifyPayment = verifyPayment;
