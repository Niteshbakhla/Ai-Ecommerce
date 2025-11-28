import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { createProduct, deleteProduct, listProducts, updateProduct } from "../services/productServices";
import { asyncHandler } from "../utils/asyncHandler";
import Product from "../models/product.model";


export const createProductController = asyncHandler(
            async (req: AuthRequest, res: Response) => {
                        const data = req.body;
                        const createdBy = req.user?.id;

                        const product = await createProduct(data, createdBy);

                        res.status(201).json({ message: "Product created successfully", product })
            }
)


export const getProductController = asyncHandler(
            async (req: AuthRequest, res: Response) => {

                        const products = await listProducts(req.query)
                        res.status(200).json({ success: true, products });
            }
)

export const productDeleteController = asyncHandler(
            async (req: AuthRequest, res: Response) => {
                        const productId = req.params.id;
                        const product = await deleteProduct(productId);
                        res.status(200).json({ success: true, message: "Product deleted successfully", product });
            }
)

export const productUpdateController = asyncHandler(
            async (req: AuthRequest, res: Response) => {
                        const productId = req.params.id;
                        const productData = req.body
                        const product = await updateProduct(productId, productData);
                        res.status(200).json({ success: true, message: "Product updated successfully", product })
            }
)

export const getSingleProduct = asyncHandler(
            async (req: AuthRequest, res: Response) => {
                        const productId = req.params.id;
                        const products = await Product.findById(productId);
                        res.status(200).json({ success: true, products })
            }
)