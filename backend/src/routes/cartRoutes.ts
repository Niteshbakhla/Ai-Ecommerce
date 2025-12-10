import { Router } from "express";
import { auth } from "../middleware/auth";
import { clearCartController, createCartController, getCartController, removeCartController, updateQuantityController } from "../controllers/cartController";


const router = Router();

router.use(auth)


router.route("/").get(getCartController)
            .post(createCartController)

router.route("/clear-all").delete(clearCartController);
router.route("/:id").delete(removeCartController)
.patch(updateQuantityController)



export default router;