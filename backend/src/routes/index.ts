import { Router } from "express";
import authRoutes from "./authRoutes"
import productRoutes from "./productRoutes"
const router = Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);

export default router;