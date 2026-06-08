import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadProfilePhoto } from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/profile-photo", protect, upload.single("photo"), uploadProfilePhoto);

export default router;