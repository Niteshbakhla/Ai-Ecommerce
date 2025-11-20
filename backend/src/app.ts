import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import router from "./routes/index";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));


app.use("/", router);

app.use(errorHandler)

export default app