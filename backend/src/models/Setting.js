import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    platformName: {
      type: String,
      default: "VivahConnect",
    },
    supportEmail: {
      type: String,
      default: "support@vivahconnect.com",
    },
    adminEmail: {
      type: String,
      default: "admin@vivahconnect.com",
    },
    websiteUrl: {
      type: String,
      default: "https://vivahconnect.com",
    },
    currency: {
      type: String,
      default: "INR",
    },
    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },
    language: {
      type: String,
      default: "English",
    },
    profileApproval: {
      type: String,
      default: "Manual Review",
    },
    photoVerification: {
      type: String,
      default: "Required",
    },
    defaultPlan: {
      type: String,
      default: "Free",
    },
    paymentGateway: {
      type: String,
      default: "Razorpay",
    },
    maintenanceMode: {
      type: String,
      default: "Disabled",
    },

    emailNotifications: {
      type: Boolean,
      default: true,
    },
    smsNotifications: {
      type: Boolean,
      default: true,
    },
    pushNotifications: {
      type: Boolean,
      default: true,
    },
    whatsappAlerts: {
      type: Boolean,
      default: false,
    },
    twoFactorAuth: {
      type: Boolean,
      default: true,
    },
    autoBlockSuspicious: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Setting = mongoose.model("Setting", settingSchema);

export default Setting;