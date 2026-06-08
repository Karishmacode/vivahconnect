import express from "express";
import {
  sendInterest,
  getSentInterests,
  getReceivedInterests,
  updateInterestStatus,
  getInterestStatus,
  getAllInterests,
  updateInterestStatusByAdmin,
  deleteInterestByAdmin,
} from "../controllers/interestController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllInterests);

router.get("/sent", protect, getSentInterests);

router.get("/received", protect, getReceivedInterests);

router.get("/status/:profileId", protect, getInterestStatus);

router.post("/:profileId", protect, sendInterest);

router.put("/:id/status", protect, updateInterestStatus);

router.patch("/:id/admin-status", protect, updateInterestStatusByAdmin);

router.delete("/:id", protect, deleteInterestByAdmin);

export default router;