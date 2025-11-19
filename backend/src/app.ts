import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import router from "./routes/index";

const app = express();

app.use(express.json());
app.use(morgan("dev"));


app.use("/", router);

export default app