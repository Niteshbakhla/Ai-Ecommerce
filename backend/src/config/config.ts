import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export default {
            PORT: process.env.PORT,
            NODE_ENV: process.env.NODE_ENV,

            MONGO_URI: process.env.MONGO_URI,

            JWT_SECRET: process.env.JWT_SECRET as jwt.Secret,
            JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as jwt.Secret,
            JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,      // e.g. "15m"
            JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,    // e.g. "30d"

            CLOUDINARY_URL: process.env.CLOUDINARY_URL,
            CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
            CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
            CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,



            RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
            RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,


            RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
            OPENAI_API_KEY: process.env.OPENAI_API_KEY,

            REDIS_URL: process.env.REDIS_URL,

            BASE_URL: process.env.BASE_URL,

            SMTP_HOST: process.env.SMTP_HOST,
            SMTP_PORT: process.env.SMTP_PORT,
            SMTP_USER: process.env.SMTP_USER,
            SMTP_PASS: process.env.SMTP_PASS
};
