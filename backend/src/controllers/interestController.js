import Interest from "../models/Interest.js";
import Profile from "../models/Profile.js";
import User from "../models/User.js";

const planLimits = {
  Free: 3,
  Silver: 25,
  Gold: 100,
  Platinum: Infinity,
};

const getActiveUserPlan = (user) => {
  const today = new Date();

  if (
    user.membershipEndDate &&
    new Date(user.membershipEndDate) < today
  ) {
    return "Free";
  }

  return user.membershipPlan || user.membership || user.plan || "Free";
};

export const sendInterest = async (req, res) => {
  try {
    const { profileId } = req.params;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    if (
      user.interestMonth !== currentMonth ||
      user.interestYear !== currentYear
    ) {
      user.interestsSentThisMonth = 0;
      user.interestMonth = currentMonth;
      user.interestYear = currentYear;
    }

    const userPlan = getActiveUserPlan(user);
    const monthlyLimit = planLimits[userPlan] || 3;

    if (
      monthlyLimit !== Infinity &&
      user.interestsSentThisMonth >= monthlyLimit
    ) {
      return res.status(403).json({
        success: false,
        limitReached: true,
        message: `Your ${userPlan} plan limit is over. Please upgrade your plan to send more interests.`,
        membership: {
          plan: userPlan,
          used: user.interestsSentThisMonth,
          limit: monthlyLimit,
        },
      });
    }

    const myProfile = await Profile.findOne({ user: req.user._id });

    if (!myProfile) {
      return res.status(404).json({
        success: false,
        message: "Please create your profile first",
      });
    }

    if (myProfile._id.toString() === profileId) {
      return res.status(400).json({
        success: false,
        message: "You cannot send interest to yourself",
      });
    }

    const receiverProfile = await Profile.findById(profileId);

    if (!receiverProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const alreadySent = await Interest.findOne({
      sender: myProfile._id,
      receiver: receiverProfile._id,
    });

    if (alreadySent) {
      return res.status(400).json({
        success: false,
        message: "Interest already sent",
      });
    }

    const interest = await Interest.create({
      sender: myProfile._id,
      receiver: receiverProfile._id,
      status: "Pending",
      acceptedAt: null,
      rejectedAt: null,
    });

    receiverProfile.interestsCount = (receiverProfile.interestsCount || 0) + 1;
    await receiverProfile.save();

    if (monthlyLimit !== Infinity) {
      user.interestsSentThisMonth += 1;
    }

    await user.save();

    res.status(201).json({
      success: true,
      message: "Interest sent successfully",
      interest,
      interestsCount: receiverProfile.interestsCount,
      membership: {
        plan: userPlan,
        used: user.interestsSentThisMonth,
        limit: monthlyLimit === Infinity ? "Unlimited" : monthlyLimit,
      },
    });
  } catch (error) {
    console.log("Send interest error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSentInterests = async (req, res) => {
  try {
    const myProfile = await Profile.findOne({ user: req.user._id });

    if (!myProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const interests = await Interest.find({ sender: myProfile._id })
      .populate("receiver")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: interests.length,
      interests,
    });
  } catch (error) {
    console.log("Get sent interests error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getReceivedInterests = async (req, res) => {
  try {
    const myProfile = await Profile.findOne({ user: req.user._id });

    if (!myProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const interests = await Interest.find({ receiver: myProfile._id })
      .populate("sender")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: interests.length,
      interests,
    });
  } catch (error) {
    console.log("Get received interests error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateInterestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const myProfile = await Profile.findOne({ user: req.user._id });

    if (!myProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const interest = await Interest.findById(id);

    if (!interest) {
      return res.status(404).json({
        success: false,
        message: "Interest not found",
      });
    }

    if (interest.receiver.toString() !== myProfile._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not allowed",
      });
    }

    interest.status = status;

    if (status === "Accepted") {
      interest.acceptedAt = new Date();
      interest.rejectedAt = null;
    }

    if (status === "Rejected") {
      interest.rejectedAt = new Date();
      interest.acceptedAt = null;
    }

    await interest.save();

    const updatedInterest = await Interest.findById(id)
      .populate("sender")
      .populate("receiver");

    res.status(200).json({
      success: true,
      message: `Interest ${status}`,
      interest: updatedInterest,
    });
  } catch (error) {
    console.log("Update interest status error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getInterestStatus = async (req, res) => {
  try {
    const { profileId } = req.params;

    const myProfile = await Profile.findOne({ user: req.user._id });

    if (!myProfile) {
      return res.status(404).json({
        success: false,
        status: "none",
        message: "Profile not found",
      });
    }

    const sentInterest = await Interest.findOne({
      sender: myProfile._id,
      receiver: profileId,
    });

    if (sentInterest) {
      return res.status(200).json({
        success: true,
        status: sentInterest.status,
        direction: "sent",
        interest: sentInterest,
      });
    }

    const receivedInterest = await Interest.findOne({
      sender: profileId,
      receiver: myProfile._id,
    });

    if (receivedInterest) {
      return res.status(200).json({
        success: true,
        status: receivedInterest.status,
        direction: "received",
        interest: receivedInterest,
      });
    }

    res.status(200).json({
      success: true,
      status: "none",
      direction: "none",
    });
  } catch (error) {
    console.log("Get interest status error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllInterests = async (req, res) => {
  try {
    const interests = await Interest.find()
      .populate("sender")
      .populate("receiver")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: interests.length,
      interests,
    });
  } catch (error) {
    console.log("Get all interests error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateInterestStatusByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const interest = await Interest.findById(id);

    if (!interest) {
      return res.status(404).json({
        success: false,
        message: "Interest not found",
      });
    }

    interest.status = status;

    if (status === "Accepted") {
      interest.acceptedAt = new Date();
      interest.rejectedAt = null;
    }

    if (status === "Rejected") {
      interest.rejectedAt = new Date();
      interest.acceptedAt = null;
    }

    if (status === "Pending") {
      interest.acceptedAt = null;
      interest.rejectedAt = null;
    }

    await interest.save();

    const updatedInterest = await Interest.findById(id)
      .populate("sender")
      .populate("receiver");

    res.status(200).json({
      success: true,
      message: `Interest ${status}`,
      interest: updatedInterest,
    });
  } catch (error) {
    console.log("Admin update interest status error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteInterestByAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const interest = await Interest.findByIdAndDelete(id);

    if (!interest) {
      return res.status(404).json({
        success: false,
        message: "Interest not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Interest deleted successfully",
    });
  } catch (error) {
    console.log("Admin delete interest error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};