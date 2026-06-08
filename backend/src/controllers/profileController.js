import Profile from "../models/Profile.js";

const userPopulateFields =
  "name email phone role membershipPlan premiumBadge";

export const createOrUpdateProfile = async (req, res) => {
  try {
    const {
      fullName,
      gender,
      religion,
      city,
      age,
      height,
      education,
      profession,
      company,
      income,
      community,
      state,
      maritalStatus,
      bio,
      photos,
      familyDetails,
      lifestyle,
      partnerPreference,
    } = req.body;

    if (!fullName || !gender || !religion || !city) {
      return res.status(400).json({
        success: false,
        message: "Full name, gender, religion and city are required.",
      });
    }

    const profileData = {
      user: req.user._id,
      fullName,
      gender,
      religion,
      city,
      age,
      height,
      education,
      profession,
      company,
      income,
      community,
      state,
      maritalStatus,
      bio,
      photos: Array.isArray(photos) ? photos : [],
      familyDetails: familyDetails || {},
      lifestyle: lifestyle || {},
      partnerPreference: partnerPreference || {},
    };

    const profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      profileData,
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    ).populate("user", userPopulateFields);

    res.status(200).json({
      success: true,
      message: "Profile saved successfully",
      profile,
    });
  } catch (error) {
    console.log("Create/update profile error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Profile save failed.",
    });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate(
      "user",
      userPopulateFields
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.log("Get my profile error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch profile.",
    });
  }
};

export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find()
      .populate("user", userPopulateFields)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: profiles.length,
      profiles,
    });
  } catch (error) {
    console.log("Get profiles error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch profiles.",
    });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true, runValidators: true }
    ).populate("user", userPopulateFields);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.log("Get profile by id error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch profile.",
    });
  }
};

export const deleteMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({ user: req.user._id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    console.log("Delete profile error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Profile delete failed.",
    });
  }
};

export const updateProfileStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid profile status.",
      });
    }

    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate("user", userPopulateFields);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile status updated",
      profile,
    });
  } catch (error) {
    console.log("Update profile status error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Profile status update failed.",
    });
  }
};



export const deleteProfileByAdmin = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully by admin",
    });
  } catch (error) {
    console.log("Admin delete profile error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Profile delete failed.",
    });
  }
};