import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    audience: {
      type: String,
      enum: ["All Users", "Free Users", "Premium Users", "Pending Users"],
      default: "All Users",
    },
    type: {
      type: String,
      enum: ["System", "Marketing", "Reminder", "Alert"],
      default: "System",
    },
    channel: {
      type: String,
      enum: ["Email", "Push", "SMS", "WhatsApp"],
      default: "Email",
    },
    scheduledDate: String,
    status: {
      type: String,
      enum: ["Draft", "Scheduled", "Sent"],
      default: "Draft",
    },
    message: { type: String, required: true, trim: true },
    sentAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);