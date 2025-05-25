import { Router } from "express";
import { jwtAuth } from "../middlewares/jwtMiddleware";
import { exportTransactions, FilterUsers, OtherUserValue, sendMoney, showTransaction, UserSignin, UserSignup, userValue } from "../controllers/user.controller";

const router = Router();

router.post("/signup", UserSignup);
router.post("/signin", UserSignin);
router.get("/user", jwtAuth, userValue);
router.get("/user/:username", jwtAuth,OtherUserValue);
router.get("/filter", jwtAuth,FilterUsers);
router.post("/send/:username", jwtAuth, sendMoney);
router.get("/transaction/:username", jwtAuth, showTransaction);
router.get("/export/:username", jwtAuth, exportTransactions);

export default router;