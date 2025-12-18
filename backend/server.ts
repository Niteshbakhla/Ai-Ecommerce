import app from "./src/app";
import config from "./src/config/config";
import connectDB from "./src/config/db";
import logger from "./src/utils/logger";

const { PORT } = config

async function startServer() {
            try {
                        await connectDB();
                        app.listen(PORT, () => {
                                    logger.info(`Server running on http://localhost:${PORT}`);
                        });
            } catch (error) {
                        logger.error("Server failed to start:", error);
                        process.exit(1);
            }
}

startServer();