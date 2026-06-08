import express from "express";

import {
  getSettings,
  updateSettings,
  resetSettings,
} from "../controllers/settingController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getSettings);
router.put("/", protect, updateSettings);
router.post("/reset", protect, resetSettings);

export default router;