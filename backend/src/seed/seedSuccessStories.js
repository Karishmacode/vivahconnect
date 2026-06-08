import dotenv from "dotenv";
import connectDB from "../config/db.js";
import SuccessStory from "../models/SuccessStory.js";
import { successStoriesSeed } from "./successStoriesSeed.js";

dotenv.config();

const seedStories = async () => {
  try {
    await connectDB();

    await SuccessStory.deleteMany();

    await SuccessStory.insertMany(successStoriesSeed);

    console.log("✅ Success stories seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedStories();