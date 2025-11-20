import { Request, Response, NextFunction } from "express";

type AsyncMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export function asyncHandler(fn: AsyncMiddleware) {
            return (req: Request, res: Response, next: NextFunction) => {
                        Promise.resolve(fn(req, res, next)).catch(next);
            };
}
