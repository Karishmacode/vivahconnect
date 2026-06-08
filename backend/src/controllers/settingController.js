import Setting from "../models/Setting.js";

const defaultSettings = {
  platformName: "VivahConnect",
  supportEmail: "support@vivahconnect.com",
  adminEmail: "admin@vivahconnect.com",
  websiteUrl: "https://vivahconnect.com",
  currency: "INR",
  timezone: "Asia/Kolkata",
  language: "English",
  profileApproval: "Manual Review",
  photoVerification: "Required",
  defaultPlan: "Free",
  paymentGateway: "Razorpay",
  maintenanceMode: "Disabled",

  emailNotifications: true,
  smsNotifications: true,
  pushNotifications: true,
  whatsappAlerts: false,
  twoFactorAuth: true,
  autoBlockSuspicious: true,
};

export const getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create(defaultSettings);
    }

    return res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create(defaultSettings);
    }

    settings = await Setting.findByIdAndUpdate(
      settings._id,
      {
        platformName: req.body.platformName,
        supportEmail: req.body.supportEmail,
        adminEmail: req.body.adminEmail,
        websiteUrl: req.body.websiteUrl,
        currency: req.body.currency,
        timezone: req.body.timezone,
        language: req.body.language,
        profileApproval: req.body.profileApproval,
        photoVerification: req.body.photoVerification,
        defaultPlan: req.body.defaultPlan,
        paymentGateway: req.body.paymentGateway,
        maintenanceMode: req.body.maintenanceMode,
        emailNotifications: req.body.emailNotifications,
        smsNotifications: req.body.smsNotifications,
        pushNotifications: req.body.pushNotifications,
        whatsappAlerts: req.body.whatsappAlerts,
        twoFactorAuth: req.body.twoFactorAuth,
        autoBlockSuspicious: req.body.autoBlockSuspicious,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetSettings = async (req, res) => {
  try {
    await Setting.deleteMany({});

    const settings = await Setting.create(defaultSettings);

    return res.status(200).json({
      success: true,
      message: "Settings reset successfully",
      settings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};