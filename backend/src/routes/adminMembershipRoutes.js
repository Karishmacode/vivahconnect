import express from "express";
import {
  getMembershipPlans,
  createMembershipPlan,
  updateMembershipPlan,
  deleteMembershipPlan,
} from "../controllers/adminMembershipController.js";

const router = express.Router();

router.get("/", getMembershipPlans);
router.post("/", createMembershipPlan);
router.put("/:id", updateMembershipPlan);
router.delete("/:id", deleteMembershipPlan);

export default router;