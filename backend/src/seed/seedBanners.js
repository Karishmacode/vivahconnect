import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Banner from "../models/Banner.js";
import { bannerSeed } from "./bannerSeed.js";

dotenv.config();

const seedBanners = async () => {
  try {
    await connectDB();
    await Banner.deleteMany();
    await Banner.insertMany(bannerSeed);

    console.log("✅ Banners seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Banner seed failed:", error);
    process.exit(1);
  }
};

seedBanners();