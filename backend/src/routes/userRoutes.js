import express from "express";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  updateUserStatus,
  upgradeMembership,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/upgrade-membership", protect, upgradeMembership);

router.route("/").get(getAll).post(createOne);

router.put("/:id/status", updateUserStatus);

router.route("/:id").get(getOne).put(updateOne).delete(deleteOne);

export default router;