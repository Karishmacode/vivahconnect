import SuccessStory from "../models/SuccessStory.js";

export const getAll = async (req, res) => {
  try {
    const stories = await SuccessStory.find({})
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: stories.length,
      stories,
    });
  } catch (error) {
    console.log("Get stories error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    res.status(200).json({
      success: true,
      story,
    });
  } catch (error) {
    console.log("Get story error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createOne = async (req, res) => {
  try {
    const {
      couple,
      title,
      city,
      weddingDate,
      status,
      image,
      story,
    } = req.body;

    const newStory = await SuccessStory.create({
      couple,
      title,
      city,
      weddingDate,
      status,
      image,
      story,
    });

    res.status(201).json({
      success: true,
      message: "Success story created successfully",
      story: newStory,
    });
  } catch (error) {
    console.log("Create story error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOne = async (req, res) => {
  try {
    const updatedStory = await SuccessStory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedStory) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Story updated successfully",
      story: updatedStory,
    });
  } catch (error) {
    console.log("Update story error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const story = await SuccessStory.findByIdAndDelete(req.params.id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Story deleted successfully",
    });
  } catch (error) {
    console.log("Delete story error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};