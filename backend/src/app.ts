import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import router from "./routes/index";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";
import config from "./config/config";

const app = express();

app.use(cors({
            origin: config.CLIENT_URL,
            credentials: true
}))

app.use(cookieParser())
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));


app.use("/api", router);

app.use(errorHandler);

export default app