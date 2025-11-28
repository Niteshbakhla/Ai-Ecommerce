import { Request, Response, NextFunction } from "express";
import { getSimilarProducts } from "../services/similarityService";
import { asyncHandler } from "../utils/asyncHandler";

export const similarProductsController = asyncHandler(
            async (
                        req: Request,
                        res: Response,
                        next: NextFunction
            ) => {

                        const productId = req.params.productId;
                        const similar = await getSimilarProducts(productId);
                        res.json(similar);
            }
)
