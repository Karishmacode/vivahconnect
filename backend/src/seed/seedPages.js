import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Page from "../models/Page.js";
import { pageSeed } from "./pageSeed.js";

dotenv.config();

const seedPages = async () => {
  try {
    await connectDB();

    await Page.deleteMany();

    await Page.insertMany(pageSeed);

    console.log("✅ CMS pages seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ CMS page seed failed:", error);
    process.exit(1);
  }
};

seedPages();