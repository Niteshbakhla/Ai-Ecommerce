import mongoose, { model, Schema, Document, Model } from "mongoose";

interface IOrderProduct {
            productId: mongoose.Types.ObjectId;
            quantity: number,
            priceAtPurchase: number
}

interface IOrderAddress {
            street: string;
            city: string;
            state: string,
            pincode: string;
            phone: string
}

export interface IOrder extends Document {
            userId: mongoose.Types.ObjectId;
            products: IOrderProduct[];
            paymentStatus: "pending" | "paid" | "failed";
            orderStatus: "pending" | "shipped" | "delivered" | "cancelled";
            address: IOrderAddress;
            paymentId?: string;
            totalAmount: number;
            razorpayOrderId: string,
            createdAt: Date;
            updatedAt: Date
}

const orderSchema = new mongoose.Schema<IOrder>({

            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            products: [
                        {
                                    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                                    quantity: Number,
                                    priceAtPurchase: Number,
                        }
            ],

            paymentStatus: {
                        type: String,
                        enum: ["pending", "paid", "failed"],
                        default: "pending"
            },

            orderStatus: {
                        type: String,
                        enum: ["pending", "shipped", "delivered", "cancelled"],
                        default: "pending"
            },

            address: {
                        street: String,
                        city: String,
                        state: String,
                        pincode: String,
                        phone: String,
            },

            paymentId: String,
            razorpayOrderId: String,
            totalAmount: { type: Number, required: true },

}, { timestamps: true });


const Order: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);
export default Order;