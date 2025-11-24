import { Router } from "express";
import { auth } from "../middleware/auth";
import { addReviewController, deleteReviewController, updateReviewController } from "../controllers/reviewController";

const router = Router();

router.use(auth)

router.route("/").post(addReviewController);
router.route("/:id")
            .delete(deleteReviewController)
            .patch(updateReviewController)

export default router;