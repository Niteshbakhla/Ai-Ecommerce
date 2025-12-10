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
            const order = await Order.create({
                        userId,
                        products: cart.items.map((item) => ({
                                    productId: item.productId,
                                    quantity: item.quantity,
                                    priceAtPurchase: (item as any).productId.price,
                        })),
                        totalAmount,
                        paymentStatus: "pending",
                        orderStatus: "pending",
                        razorpayOrderId: razorpayOrder.id,
                        address,
            });


            return {
                        razorpayOrderId: razorpayOrder.id,
                        amount: razorpayOrder.amount,
                        currency: razorpayOrder.currency,
                        orderId: order._id,
                        key_id: RAZORPAY_KEY_ID,
                        success: true
            };
}


export const verifyAndFinalizeOrder = async (data: {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
}) => {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

            const body = razorpay_order_id + "|" + razorpay_payment_id;

            const expectedSignature = crypto
                        .createHmac("sha256", RAZORPAY_KEY_SECRET as string)
                        .update(body.toString())
                        .digest("hex");

            if (expectedSignature !== razorpay_signature) {
                        throw new Error("Invalid payment signature");
            }

            const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
            if (!order) throw new Error("Order not found");

            // reduce stock
            for (const item of order.products) {
                        await Product.findByIdAndUpdate(item.productId, {
                                    $inc: { stock: -item.quantity },
                        });
            }

            order.paymentStatus = "paid";
            order.orderStatus = "pending";
            order.paymentId = razorpay_payment_id;
            await order.save();

            // clear cart
            await Cart.findOneAndDelete({ userId: order.userId });
            return order;
};

export const getUserOrders = async (userId: string) => {
            return Order.find({ userId }).sort({ createdAt: -1 });
};

export const getOrderById = async (id: string, userId: string) => {
            return Order.findOne({ _id: id, userId }).populate("products.productId");
};