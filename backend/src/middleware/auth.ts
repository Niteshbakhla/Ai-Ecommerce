import { Response, NextFunction, Request } from "express";
import User, { IUser } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import AppError from "../utils/customError";
import jwt from "jsonwebtoken";
import config from "../config/config";

const { JWT_SECRET } = config

export interface AuthRequest extends Request {
            user?: IUser;
}

export const auth = asyncHandler(
            async (req: AuthRequest, res: Response, next: NextFunction) => {
                        const header = req.headers.authorization;

                        if (!header || !header.startsWith("Bearer ")) {
                                    res.status(401).json({ message: "Unauthorized" });
                                    return;
                        }

                        const token = header.split(" ")[1];

                        try {
                                    const payload = jwt.verify(token, JWT_SECRET as string) as {
                                                id: string;
                                                role: string;
                                    };

                                    const user = await User.findById(payload.id).select("-password");

                                    if (!user) {
                                                res.status(401).json({ message: "Unauthorized" });
                                                return;
                                    }

                                    req.user = user;
                                    next();

                        } catch (err) {
                                    res.status(401).json({ message: "Token expired or invalid" });
                                    return;
                        }
            }
);



export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
            if (!req.user || req.user.role !== "admin") {
                        throw new AppError("Forbidden", 403);
            }

            next();
}