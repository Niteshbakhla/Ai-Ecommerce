import { Router } from "express";
import authRoutes from "./authRoutes";
import productRoutes from "./productRoutes";
import cartRoutes from "./cartRoutes";
const router = Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/cart", cartRoutes);

export default router;