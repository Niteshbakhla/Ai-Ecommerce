import User, { IUser } from "../models/user.model";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken";

export const registerUser = async (name: string, email: string, password: string): Promise<IUser> => {
            const existing = await User.findOne({ email });
            if (existing) throw new Error("Email already exists");

            const user = await User.create({ name, email, password });

            return user;
};

export const loginUser = async (email: string, password: string) => {
            const user = await User.findOne({ email });
            if (!user) throw new Error("Invalid email or password");

            const match = await bcrypt.compare(password, user.password);
            if (!match) throw new Error("Invalid email or password");

            const accessToken = generateAccessToken(user._id.toString(), user.role);
            const refreshToken = generateRefreshToken(user._id.toString(), user.role);

            user.lastLogin = new Date();
            await user.save();

            return { user, accessToken, refreshToken };
};

export const refreshAccessToken = async (payload: any): Promise<string> => {
            return generateAccessToken(payload.id, payload.role);
};
