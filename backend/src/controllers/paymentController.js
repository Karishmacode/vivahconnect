import User from "../models/User.js";

const allowedPlans = ["Free", "Silver", "Gold", "Platinum"];

const planLimits = {
  Free: 3,
  Silver: 25,
  Gold: 100,
  Platinum: 999999,
};

const planDurationDays = {
  Free: 30,
  Silver: 30,
  Gold: 90,
  Platinum: 180,
};

export const fakeUpgradePlan = async (req, res) => {
  try {
    const { plan } = req.body;

    if (!plan || !allowedPlans.includes(plan)) {
      return res.status(400).json({
        success: false,
        message: "Invalid membership plan",
      });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + planDurationDays[plan]);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        plan,
        membership: plan,
        membershipPlan: plan,
        membershipStatus: "Active",
        membershipStartDate: startDate,
        membershipEndDate: endDate,
        premiumBadge: plan !== "Free",
        interestLimit: planLimits[plan],
        interestsSentThisMonth: 0,
        interestMonth: new Date().getMonth() + 1,
        interestYear: new Date().getFullYear(),
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `${plan} plan activated successfully`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Plan upgrade failed",
      error: error.message,
    });
  }
};