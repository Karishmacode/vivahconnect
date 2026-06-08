import mongoose from "mongoose";
const reportSchema = new mongoose.Schema(
  {
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
    reason: String,
    description: String,
    status: { type: String, default: "open" },
  },
  { timestamps: true }
);
export default mongoose.model("Report", reportSchema);
