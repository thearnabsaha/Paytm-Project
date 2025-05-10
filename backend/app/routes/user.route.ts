import { Router } from "express";
import { jwtAuth } from "../middlewares/jwtMiddleware";
import { UserSignin, UserSignup, userValue } from "../controllers/user.controller";

const router = Router();

router.post("/signup", UserSignup);
router.post("/signin", UserSignin);
router.get("/user", jwtAuth, userValue);

export default router;