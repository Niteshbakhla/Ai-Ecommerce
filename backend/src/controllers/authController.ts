import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { registerUser, loginUser, refreshAccessToken } from "../services/authServices";
import { registerSchema, loginSchema } from "../validators/authValidators";

export const register = async (req: Request, res: Response, next: NextFunction) => {
            try {
                        const { error } = registerSchema.validate(req.body);
                        if (error) return res.status(400).json({ message: error.message });

                        const { name, email, password } = req.body;
                        const user = await registerUser(name, email, password);

                        res.status(201).json({ message: "User Registered", user });
            } catch (err) {
                        next(err);
            }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
            try {
                        const { error } = loginSchema.validate(req.body);
                        if (error) return res.status(400).json({ message: error.message });

                        const { email, password } = req.body;
                        const { user, accessToken, refreshToken } = await loginUser(email, password);

                        res.cookie("refreshToken", refreshToken, {
                                    httpOnly: true,
                                    secure: true,
                                    sameSite: "strict",
                                    maxAge: 30 * 24 * 60 * 60 * 1000,
                        });

                        res.status(200).json({ message: "Login Success", accessToken, user });
            } catch (err) {
                        next(err);
            }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
            try {
                        const token = req.cookies.refreshToken;
                        if (!token) return res.status(401).json({ message: "Unauthorized" });

                        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
                        const accessToken = await refreshAccessToken(payload);

                        res.json({ accessToken });
            } catch (err) {
                        next(err);
            }
};
