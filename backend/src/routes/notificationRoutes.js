import express from "express";
import {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
} from "../controllers/notificationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getNotifications);
router.post("/", protect, createNotification);
router.put("/:id", protect, updateNotification);
router.delete("/:id", protect, deleteNotification);

export default router;