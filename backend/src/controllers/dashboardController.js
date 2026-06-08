import User from "../models/User.js";
import Profile from "../models/Profile.js";
import Interest from "../models/Interest.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const premiumMembers = await User.countDocuments({
      membershipPlan: { $in: ["Silver", "Gold", "Platinum"] },
    });

    const interestsSent = await Interest.countDocuments();

    const successfulMatches = await Interest.countDocuments({
      status: "Accepted",
    });

    const pendingProfiles = await Profile.countDocuments({
      status: "Pending",
    });

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email membershipPlan status createdAt");

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        premiumMembers,
        interestsSent,
        successfulMatches,
        pendingProfiles,
        newUsersToday: 0,
        revenueToday: 0,
        activeSubscriptions: premiumMembers,
      },
      recentUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};