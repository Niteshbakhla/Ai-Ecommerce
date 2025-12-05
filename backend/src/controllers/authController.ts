import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { registerUser, loginUser, refreshAccessToken } from "../services/authServices";
import { registerSchema, loginSchema } from "../validators/authValidators";
import { asyncHandler } from "../utils/asyncHandler";

export const register = asyncHandler(
            async (req: Request, res: Response, next: NextFunction) => {

                        const { error } = registerSchema.validate(req.body);
                        if (error) {
                                    res.status(400).json({ message: error.message });
                                    return
                        }

                        const { name, email, password } = req.body;
                        const user = await registerUser(name, email, password);

                        res.status(201).json({ message: "User Registered", user });

            }
)

export const login = asyncHandler(
            async (req: Request, res: Response) => {

                        const { error } = loginSchema.validate(req.body);
                        if (error) {
                                    res.status(400).json({ message: error.message });
                                    return
                        }

                        const { email, password } = req.body;
                        const { user, accessToken, refreshToken } = await loginUser(email, password);

                        res.cookie("refreshToken", refreshToken, {
                                    httpOnly: true,
                                    secure: true,
                                    sameSite: "none",
                                    maxAge: 30 * 24 * 60 * 60 * 1000,
                        });

                        res.status(200).json({ message: "Login Success", accessToken, user });

            }
)

export const refresh = asyncHandler(
            async (req: Request, res: Response) => {

                        const token = req.cookies.refreshToken;
                        if (!token) {
                                    res.status(401).json({ message: "Unauthorized" });
                                    return;
                        }

                        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
                        const accessToken = await refreshAccessToken(payload);

                        res.json({ accessToken });
            }
);
