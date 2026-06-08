import User from "../models/User.js";

const planConfig = {
  Free: { limit: 3, days: 30, premiumBadge: false },
  Silver: { limit: 25, days: 30, premiumBadge: true },
  Gold: { limit: 100, days: 90, premiumBadge: true },
  Platinum: { limit: 999999, days: 180, premiumBadge: true },
};

export const getAll = async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

export const createOne = async (req, res) => {
  try {
    const user = await User.create(req.body);
    user.password = undefined;

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
    });
  }
};

export const updateOne = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["active", "blocked"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user status",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `User ${status} successfully`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user status",
      error: error.message,
    });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

export const upgradeMembership = async (req, res) => {
  try {
    const { membershipPlan } = req.body;

    if (!membershipPlan || !planConfig[membershipPlan]) {
      return res.status(400).json({
        success: false,
        message: "Invalid membership plan",
      });
    }

    const config = planConfig[membershipPlan];

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + config.days);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        plan: membershipPlan,
        membership: membershipPlan,
        membershipPlan,
        membershipStatus: "Active",
        membershipStartDate: startDate,
        membershipEndDate: endDate,
        premiumBadge: config.premiumBadge,
        interestLimit: config.limit,
        interestsSentThisMonth: 0,
        interestMonth: new Date().getMonth() + 1,
        interestYear: new Date().getFullYear(),
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `${membershipPlan} plan activated successfully`,
      user,
    });
  } catch (error) {
    console.log("Upgrade membership error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};