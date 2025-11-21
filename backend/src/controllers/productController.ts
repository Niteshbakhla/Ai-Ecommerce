import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { createProduct } from "../services/productServices";
import { asyncHandler } from "../utils/asyncHandler";





export const createProductController = asyncHandler(
            async (req: AuthRequest, res: Response) => {
                        const data = req.body;
                        const createdBy = req.user?.id;

                        const product = await createProduct(data, createdBy);

                        res.status(201).json({ message: "Product created successfully", product })
            }
)