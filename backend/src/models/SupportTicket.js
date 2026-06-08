import mongoose from "mongoose";

const supportTicketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    user: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Account", "Payment", "Verification", "Profile", "Membership"],
      default: "Account",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Pending", "Active", "Approved", "Rejected"],
      default: "Pending",
    },
    channel: {
      type: String,
      enum: ["Email", "Chat", "Phone", "WhatsApp"],
      default: "Email",
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    reply: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const SupportTicket = mongoose.model("SupportTicket", supportTicketSchema);

export default SupportTicket;