import Banner from "../models/Banner.js";

export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: banners.length,
      banners,
    });
  } catch (error) {
    console.log("Get banners error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      banner,
    });
  } catch (error) {
    console.log("Get banner error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createBanner = async (req, res) => {
  try {
    const banner = await Banner.create(req.body);

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      banner,
    });
  } catch (error) {
    console.log("Create banner error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      banner,
    });
  } catch (error) {
    console.log("Update banner error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.log("Delete banner error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};