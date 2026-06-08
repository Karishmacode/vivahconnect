import mongoose from "mongoose";
const planSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    duration: String,
    badge: String,
    features: [String],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);
export default mongoose.model("Plan", planSchema);
