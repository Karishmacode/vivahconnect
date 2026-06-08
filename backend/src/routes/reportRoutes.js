import express from "express";
import {
  createOrUpdateProfile,
  getMyProfile,
  getProfiles,
  getProfileById,
  deleteMyProfile,
  updateProfileStatus,
} from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/me", protect, createOrUpdateProfile);
router.get("/me", protect, getMyProfile);
router.delete("/me", protect, deleteMyProfile);

router.get("/", getProfiles);
router.get("/:id", getProfileById);
router.patch("/:id/status", protect, updateProfileStatus);

export default router;