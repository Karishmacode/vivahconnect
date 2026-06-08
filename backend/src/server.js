import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import { checkExpiredMemberships } from "./services/membershipExpiryService.js";

dotenv.config();

connectDB();

checkExpiredMemberships();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});