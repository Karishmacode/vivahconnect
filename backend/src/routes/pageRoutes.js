import express from "express";

import {
  getPages,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage,
} from "../controllers/pageController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getPages);
router.get("/slug/:slug", getPageBySlug);

// Admin protected routes
router.post("/", protect, createPage);
router.put("/:id", protect, updatePage);
router.delete("/:id", protect, deletePage);

export default router;