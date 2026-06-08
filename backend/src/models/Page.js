import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    category: {
      type: String,
      default: "Company",
    },

    status: {
      type: String,
      enum: ["Active", "Pending", "Blocked"],
      default: "Active",
    },

    heroImage: {
      type: String,
      default: "",
    },

    highlight: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    content: {
      type: String,
      default: "",
    },

    sections: [
      {
        title: String,
        description: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Page", pageSchema);