import mongoose from "mongoose";
import logger from "../utils/logger";
import config from "./config";

const connectDB = async () => {
            try {
                        const connect = await mongoose.connect(config.MONGO_URI as string)
                        if (connect.connection.readyState === 1) {
                                    logger.info("MongoDB connected successfully");
                        }
            } catch (error) {
                        logger.error("MongoDB connection Error!", error);
                        process.exit(1);
            }
}

export default connectDB;