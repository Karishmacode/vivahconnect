import express from "express";
import {
  createOrUpdateProfile,
  getMyProfile,
  getProfiles,
  getProfileById,
  deleteMyProfile,
  updateProfileStatus,
  deleteProfileByAdmin,
} from "../controllers/profileController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProfiles);

router.get("/me", protect, getMyProfile);

router.post("/me", protect, createOrUpdateProfile);

router.put("/me", protect, createOrUpdateProfile);

router.delete("/me", protect, deleteMyProfile);

router.patch("/:id/status", protect, updateProfileStatus);

router.delete("/:id", protect, deleteProfileByAdmin);

router.get("/:id", getProfileById);

export default router;