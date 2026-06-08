import dotenv from "dotenv";
import connectDB from "../config/db.js";
import MembershipPlan from "../models/MembershipPlan.js";

dotenv.config();

connectDB();

const plans = [
  {
    name: "Free",
    price: 0,
    duration: 30,
    users: 0,
    status: "Active",
    features:
      "Create Profile, Search Profiles, Send 3 Interests / month, WhatsApp access for 7 days after match accepted",
  },
  {
    name: "Silver",
    price: 299,
    duration: 30,
    users: 0,
    status: "Active",
    features:
      "25 Interests / month, WhatsApp access for 30 days, View full profiles, Basic support",
  },
  {
    name: "Gold",
    price: 799,
    duration: 90,
    users: 0,
    status: "Active",
    features:
      "100 Interests, WhatsApp access for 90 days, See who viewed you, Priority listing",
  },
  {
    name: "Platinum",
    price: 1499,
    duration: 180,
    users: 0,
    status: "Active",
    features:
      "Unlimited interests, WhatsApp access for 6 months, Premium badge, Priority support, Profile highlighting",
  },
];

const seedPlans = async () => {
  try {
    await MembershipPlan.deleteMany();
    await MembershipPlan.insertMany(plans);

    console.log("Membership plans seeded successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedPlans();