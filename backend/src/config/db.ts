import mongoose from "mongoose";
import logger from "../utils/logger";

const connectDB = async () => {
            try {
                        const connect = await mongoose.connect("mongodb://localhost:27017/ecommerce-ai")
                        if (connect.connection.readyState === 1) {
                                    logger.info("MongoDB connected successfully");
                        }
            } catch (error) {
                        logger.error("MongoDB connection Error!");
                        process.exit(1);
            }
}

export default connectDB;