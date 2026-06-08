import User from "../models/User.js";

export const checkExpiredMemberships = async () => {
  try {
    const today = new Date();

    const result = await User.updateMany(
      {
        membershipStatus: "Active",
        membershipEndDate: { $ne: null, $lt: today },
        membershipPlan: { $ne: "Free" },
      },
      {
        $set: {
          plan: "Free",
          membership: "Free",
          membershipPlan: "Free",
          membershipStatus: "Expired",
          premiumBadge: false,
          interestLimit: 3,
          interestsSentThisMonth: 0,
          membershipEndDate: null,
        },
      }
    );

    console.log(
      `Expired memberships checked. Updated users: ${result.modifiedCount}`
    );
  } catch (error) {
    console.log("Membership expiry check failed:", error.message);
  }
};