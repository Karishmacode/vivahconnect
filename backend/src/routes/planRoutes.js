import express from "express";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/planController.js";
const router = express.Router();
router.route("/").get(getAll).post(createOne);
router.route("/:id").get(getOne).put(updateOne).delete(deleteOne);
export default router;
