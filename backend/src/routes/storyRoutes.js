import express from "express";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/successStoryController.js";

const router = express.Router();

// GET ALL STORIES
router.get("/", getAll);

// GET SINGLE STORY
router.get("/:id", getOne);

// CREATE STORY
router.post("/", createOne);

// UPDATE STORY
router.put("/:id", updateOne);

// DELETE STORY
router.delete("/:id", deleteOne);

export default router;