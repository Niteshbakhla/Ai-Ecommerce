import { Router } from "express";
import authRoutes from "./authRoutes";
import productRoutes from "./productRoutes";
import cartRoutes from "./cartRoutes";
import orderRoutes from "./orderRoutes";
import reviewRoutes from "./reviewRoutes";
import adminAnalyticsRoutes from "./adminAnalyticsRoutes";
const router = Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/review", reviewRoutes);
router.use("/admin/analytics", adminAnalyticsRoutes);
export default router;