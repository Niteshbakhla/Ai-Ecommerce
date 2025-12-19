import config from "../config/config";
import razorpayInstance from "../config/razorpay";
import Cart from "../models/cart.model"
import Order from "../models/order.model";
import Product from "../models/product.model";
import AppError from "../utils/customError";
import crypto from "crypto"


const { RAZORPAY_KEY_SECRET, RAZORPAY_KEY_ID } = config;

interface AddressInput {
            street?: string;
            city?: string;
            state?: string;
            pincode?: string;
            phone?: string;
}



export const createCheckoutOrder = async (userId: string, address: AddressInput) => {
            const cart = await Cart.findOne({ userId }).populate("items.productId");
            if (!cart || cart.items.length === 0) {
                        throw new AppError("Cart is empty", 400);
            }

            let totalAmount = 0;

            cart.items.forEach((item) => {
                        const product: any = item.productId;
                        if (!product) return;
                        totalAmount += product.price * item.quantity;
            });

            // amount in paise (₹1 = 100)
            const options = {
                        amount: totalAmount * 100,
                        currency: "INR",
                        receipt: `rcpt_${Date.now()}`,
            };

            const razorpayOrder = await razorpayInstance.orders.create(options);



            return {
                        razorpayOrderId: razorpayOrder.id,
                        amount: razorpayOrder.amount,
                        currency: razorpayOrder.currency,
                        key_id: RAZORPAY_KEY_ID,
                        success: true
            };
}


export const verifyAndFinalizeOrder = async (userId: string, data: any) => {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;
            console.log(data)
            // Step 1: Verify signature
            const expectedSignature = crypto
                        .createHmac("sha256", RAZORPAY_KEY_SECRET as string)
                        .update(razorpay_order_id + "|" + razorpay_payment_id)
                        .digest("hex");

            if (expectedSignature !== razorpay_signature) {
                        throw new Error("Invalid payment signature");
            }

            // Step 2: Fetch cart again (fresh)
            const cart = await Cart.findOne({ userId }).populate("items.productId");

            if (!cart || cart.items.length === 0) {
                        throw new Error("Cart is empty");
            }

            // Step 3: Calculate total
            let totalAmount = 0;
            cart.items.forEach((item: any) => {
                        totalAmount += item.productId.price * item.quantity;
            });

            // Step 4: Create final order ONLY after payment success
            const order = await Order.create({
                        userId,
                        razorpayOrderId: razorpay_order_id,
                        paymentId: razorpay_payment_id,
                        paymentStatus: "paid",
                        orderStatus: "pending",

                        products: cart.items.map((item: any) => ({
                                    productId: item.productId._id,
                                    quantity: item.quantity,
                                    priceAtPurchase: item.productId.price
                        })),

                        totalAmount,
                        address: data.address // optional
            });

            // Step 5: Reduce stock for each product
            for (const item of cart.items) {
                        await Product.findByIdAndUpdate(item.productId._id, {
                                    $inc: { stock: -item.quantity }
                        });
            }

            // Step 6: Clear cart
            await Cart.findOneAndDelete({ userId });

            return order;
};



export const getUserOrders = async (userId: string) => {
            return Order.find({ userId }).sort({ createdAt: -1 });
};

export const getOrderById = async (id: string, userId: string) => {
            return Order.findOne({ _id: id, userId }).populate("products.productId");
};


export const getOrdersForAdmin = async (filters = {}) => {
            return Order.find(filters).populate("userId", "name email").sort({ createdAt: -1 });
}