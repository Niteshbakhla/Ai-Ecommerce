import { NextFunction, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { addReview, deleteReview, getReview, updateReview } from "../services/reviewService";
import { asyncHandler } from "../utils/asyncHandler";


export const addReviewController = asyncHandler(
            async (req: AuthRequest, res: Response, next: NextFunction) => {

                        const { productId, rating, comment } = req.body;
                        const userId = req.user?.id;
                        const review = await addReview(userId, productId, rating, comment);

                        res.status(201).json({ success: true, message: "Review added successfully", review })
            }
)

export const getReviewController = asyncHandler(
            async (req: AuthRequest, res: Response, next: NextFunction) => {
                        const productId = req.params.id;

                        const review = await getReview(productId);

                        res.status(200).json({ review });
            }
)

export const deleteReviewController = asyncHandler(
            async (req: AuthRequest, res: Response, next: NextFunction) => {
                        const reviewId = req.params.id;
                        const userId = req.user?.id;
                        const review = await deleteReview(userId.toString(), reviewId);

                        res.status(200).json({ success: true, message: "Review deleted successfully" });
            }
)


export const updateReviewController = asyncHandler(
            async (req: AuthRequest, res: Response, next: NextFunction) => {
                        const { rating, comment } = req.body;
                        const reviewId = req.params.id
                        const review = await updateReview(req.user?.id.toString(), reviewId, rating, comment);
                        res.status(200).json({ success: true, message: "Review updated", review });
            }
)