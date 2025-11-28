import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { createProduct, deleteProduct, listProducts, updateProduct } from "../services/productServices";
import { asyncHandler } from "../utils/asyncHandler";
import Category from "../models/category.model";
import Product from "../models/product.model";


export const createProductController = asyncHandler(
            async (req: AuthRequest, res: Response) => {
                        const data = req.body;
                        const createdBy = req.user?.id;

                        // 1) Extract title & description
                        const textParts = [req.body.title, req.body.description];

                        // 2) Fetch category name if categoryId exists
                        if (req.body.category) {
                                    const category = await Category.findById(req.body.category).select("name");
                                    if (category) {
                                                textParts.push(category.name);
                                    }
                        }

                        // 3) Build searchText
                        const searchText = textParts.join(" ").toLowerCase();

                        // 4) Add searchText + createdBy to the product data
                        const finalData = {
                                    ...data,
                                    createdBy,
                                    searchText,
                        };

                        // 5) Create product in DB
                        const product = await createProduct(finalData, createdBy);

                        res.status(201).json({ message: "Product created successfully", product });
            }
);



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