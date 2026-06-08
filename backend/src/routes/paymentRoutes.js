import express from "express";
import { fakeUpgradePlan } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/fake-upgrade", protect, fakeUpgradePlan);

export default router;