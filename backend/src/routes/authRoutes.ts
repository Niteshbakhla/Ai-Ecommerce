import { Router } from "express";
import { login, refresh, register } from "../controllers/authController";


const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/refresh").get(refresh);


export default router;

