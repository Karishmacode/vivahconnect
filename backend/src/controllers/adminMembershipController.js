import MembershipPlan from "../models/MembershipPlan.js";
import User from "../models/User.js";

export const getMembershipPlans = async (req, res) => {
  try {
    const plans = await MembershipPlan.find().sort({ price: 1 });

    const plansWithUserCount = await Promise.all(
      plans.map(async (plan) => {
        const userCount = await User.countDocuments({
          $or: [
            { membershipPlan: plan.name },
            { membership: plan.name },
            { plan: plan.name },
          ],
        });

        return {
          ...plan.toObject(),
          users: userCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      plans: plansWithUserCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch membership plans",
      error: error.message,
    });
  }
};

export const createMembershipPlan = async (req, res) => {
  try {
    const { name, price, duration, status, features, popular } = req.body;

    if (!name || price === "" || !duration || !features) {
      return res.status(400).json({
        success: false,
        message: "Name, price, duration and features are required",
      });
    }

    const plan = await MembershipPlan.create({
      name,
      price: Number(price),
      duration: Number(duration),
      users: 0,
      status: status || "Active",
      popular: popular || false,
      features,
    });

    res.status(201).json({
      success: true,
      message: "Membership plan created successfully",
      plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create membership plan",
      error: error.message,
    });
  }
};

export const updateMembershipPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, duration, status, features, popular } = req.body;

    const plan = await MembershipPlan.findByIdAndUpdate(
      id,
      {
        name,
        price: Number(price),
        duration: Number(duration),
        status: status || "Active",
        popular: popular || false,
        features,
      },
      { new: true, runValidators: true }
    );

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Membership plan not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Membership plan updated successfully",
      plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update membership plan",
      error: error.message,
    });
  }
};

export const deleteMembershipPlan = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await MembershipPlan.findByIdAndDelete(id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Membership plan not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Membership plan deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete membership plan",
      error: error.message,
    });
  }
};