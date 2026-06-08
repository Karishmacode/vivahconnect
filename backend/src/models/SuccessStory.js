import mongoose from "mongoose";

const successStorySchema = new mongoose.Schema(
  {
    couple: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      trim: true,
      default: "",
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    weddingDate: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Approved", "Pending", "Rejected"],
      default: "Pending",
    },

    image: {
      type: String,
      default: "",
    },

    story: {
      type: String,
      required: true,
      trim: true,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SuccessStory", successStorySchema);