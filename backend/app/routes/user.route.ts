import { Router } from "express";
import { jwtAuth } from "../middlewares/jwtMiddleware";
import { FilterUsers, OtherUserValue, UserSignin, UserSignup, userValue } from "../controllers/user.controller";

const router = Router();

router.post("/signup", UserSignup);
router.post("/signin", UserSignin);
router.get("/user", jwtAuth, userValue);
router.get("/user/:username", OtherUserValue);
router.get("/filter", FilterUsers);

export default router;