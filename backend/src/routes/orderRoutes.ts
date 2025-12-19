import { Router } from "express";
import { auth, isAdmin } from "../middleware/auth";
import { createCheckoutOrderController, getMyOrderByIdController, getOrderForAdmin, getUserOrderController, verifyPaymentController } from "../controllers/orderController";


const router = Router();

router.use(auth)

router.route("/user-order").get(isAdmin, getOrderForAdmin);
router.route("/create-checkout").post(createCheckoutOrderController);
router.route("/verify-payment").post(verifyPaymentController);
router.route("/:id").get(getMyOrderByIdController);
router.route("/").get(getUserOrderController)
export default router;