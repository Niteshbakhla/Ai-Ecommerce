import mongoose, { Model, Schema, Document } from "mongoose";
import { IOrder } from "./order.model";

interface IRating {
            min: number,
            max: number
}

export interface IReview extends Document {
            userId: mongoose.Types.ObjectId;
            productId: mongoose.Types.ObjectId;
            rating: IRating;
            comment: string
}

const reviewSchema = new Schema<IReview>(
            {
                        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
                        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                        rating: { type: Number, min: 1, max: 5, required: true },
                        comment: { type: String }
            },
            { timestamps: true }
)

const Review: Model<IReview> = mongoose.model<IReview>("Review", reviewSchema);
export default Review;