import jwt from "jsonwebtoken";
import config from "../config/config";
const { JWT_SECRET, JWT_REFRESH_SECRET } = config;


export const generateAccessToken = (id: string, role: string): string => {
            return jwt.sign({ id, role }, JWT_SECRET as string, {
                        expiresIn: "15m",
            });
};

export const generateRefreshToken = (id: string, role: string): string => {
 
            return jwt.sign({ id, role }, JWT_REFRESH_SECRET as string, {
                        expiresIn: "30d",
            });
};
