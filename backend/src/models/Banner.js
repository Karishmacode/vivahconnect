import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      default: "Homepage",
    },

    device: {
      type: String,
      enum: ["Desktop", "Mobile", "Both"],
      default: "Both",
    },

    status: {
      type: String,
      enum: ["Active", "Pending", "Blocked"],
      default: "Active",
    },

    image: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      default: "/",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Banner", bannerSchema);