import { Request, Response } from "express"
import { AuthRequest } from "../middleware/auth"
import { addToCart, clearCart, getUserCart, removeCartItem } from "../services/cartServices";
import { asyncHandler } from "../utils/asyncHandler";



export const getCartController = asyncHandler(
            async (req: AuthRequest, res: Response) => {
                        const carts = await getUserCart(req.user?.id);
                        res.status(200).json({ success: true, carts })
            }
)

export const createCartController = asyncHandler(
            async (req: AuthRequest, res: Response) => {
                        const { productId } = req.body;
                         console.log(productId)
                        const userId = req.user?.id;

                        const cart = await addToCart(userId, productId);

                        res.status(201).json({ success: true, message: "added to cart", cart });
            }
)


export const removeCartController = asyncHandler(
            async (req: AuthRequest, res: Response) => {
                        const proudctId = req.params.id;
                        const cart = await removeCartItem(req.user?.id, proudctId)
                        res.status(200).json({ success: true, message: "Item removed" })
            }
)

export const clearCartController = asyncHandler(
            async (req: AuthRequest, res: Response) => {
                        const cart = await clearCart(req.user?.id);
                        res.status(200).json({ success: true, message: "Cart cleared" })
            }
)


