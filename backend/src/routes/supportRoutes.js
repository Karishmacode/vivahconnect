import express from "express";

import {
  getTickets,
  createTicket,
  updateTicket,
  replyTicket,
  updateTicketStatus,
  deleteTicket,
} from "../controllers/supportController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTickets);
router.post("/", protect, createTicket);
router.put("/:id", protect, updateTicket);
router.patch("/:id/reply", protect, replyTicket);
router.patch("/:id/status", protect, updateTicketStatus);
router.delete("/:id", protect, deleteTicket);

export default router;