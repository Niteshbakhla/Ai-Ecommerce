import { Response, Request, NextFunction } from "express";
import AppError from "../utils/customError";


export const errorHandler = (
            err: AppError,
            req: Request,
            res: Response,
            next: NextFunction
) => {
            const message = err.message || "Internal server error";
            const statusCode = err.statusCode || 500

            res.status(statusCode).json({ success: false, message })
}