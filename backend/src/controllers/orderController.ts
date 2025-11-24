import { NextFunction, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { asyncHandler } from "../utils/asyncHandler";
import { createCheckoutOrder, getOrderById, getUserOrders, verifyAndFinalizeOrder } from "../services/orderServices";
import AppError from "../utils/customError";





export const createCheckoutOrderController = asyncHandler(
            async (req: AuthRequest, res: Response, next: NextFunction) => {
                        const { address } = req.body;
                        const result = await createCheckoutOrder(req.user?.id.toString(), address || {});
                        res.status(201).json(result);
            }
)


export const verifyPaymentController = asyncHandler(
            async (
                        req: AuthRequest,
                        res: Response,
                        next: NextFunction
            ) => {
                        const order = await verifyAndFinalizeOrder(req.body)
                        res.status(200).json({ success: true, messaeg: "Payment verified", order });
            }
)

export const getOrdersControllers = asyncHandler(
            async (req: AuthRequest, res: Response, next: NextFunction) => {
                        const orders = await getUserOrders(req.user?.id.toString())
                        res.status(200).json(orders);
            }
)

export const getMyOrderByIdController = asyncHandler(
            async (req: AuthRequest, res: Response, next: NextFunction) => {
                        const order = await getOrderById(req.params.id, req.user?.id.toString())
                        if (!order) {
                                    throw new AppError("Order not found", 404);
                        }

                        res.status(200).json(order);
            }
)