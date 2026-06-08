import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    answer: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["Account", "Membership", "Verification", "Privacy", "Payments"],
      default: "Account",
    },

    status: {
      type: String,
      enum: ["Active", "Pending", "Blocked"],
      default: "Active",
    },
  },
  { timestamps: true }
);

const Faq = mongoose.model("Faq", faqSchema);

export default Faq;