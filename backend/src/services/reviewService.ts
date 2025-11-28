import mongoose from "mongoose";
import Order from "../models/order.model"
import Review from "../models/review.model";
import AppError from "../utils/customError"
import Product from "../models/product.model";


export const addReview = async (userId: string, productId: string, rating: string, comment?: string) => {
            const purchase = await Order.findOne(
                        {
                                    userId,
                                    "products.productId": productId,
                                    paymentStatus: "paid"
                        }
            )

            if (!purchase) throw new AppError("You can review ony after  purchase", 400);

            const review = await Review.create({ userId, productId, rating, comment });
            await updateProductRating(productId);

            return review;
}


export const deleteReview = async (userId: string, reviewId: string) => {

            const review = await Review.findOneAndDelete({ userId, _id: reviewId });
            if (!review) throw new AppError("Review not found", 400);

            await updateProductRating(review.productId.toString())

            return review;
}


export const getReview = async (productId: string) => {
            const review = await Review.find({ productId }).populate("userId", "name").sort({ createdAt: -1 });
            if (review.length === 0) throw new AppError("Review not found", 404);

            return review;
}


export const updateReview = async (userId: string, reviewId: string, rating?: number, comment?: string) => {
            const review = await Review.findByIdAndUpdate({ userId, _id: reviewId }, { rating, comment }, { new: true });
            if (!review) throw new AppError("Review not found ", 404);
            
            await updateProductRating(review.productId.toString());
            return review;
}

export const updateProductRating = async (productId: string) => {
            const result = await Review.aggregate([
                        { $match: { productId: new mongoose.Types.ObjectId(productId) } },
                        {
                                    $group: {
                                                _id: "$productId",
                                                avgRating: { $avg: "$rating" },
                                                count: { $sum: 1 }
                                    }
                        }
            ]);

            if (result.length > 0) {
                        await Product.findByIdAndUpdate(productId, {
                                    ratingsAverage: result[0].avgRating,
                                    ratingCount: result[0].count
                        })
            } else {
                        await Product.findByIdAndUpdate(productId, {
                                    ratingsAverage: 0,
                                    ratingsCount: 0
                        })
            }
}