import Plan from "../models/Plan.js";
export const getAll = async (req, res) => {
  const data = await Plan.find({}).sort({ createdAt: -1 });
  res.json(data);
};
export const getOne = async (req, res) => {
  const item = await Plan.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
};
export const createOne = async (req, res) => {
  const item = await Plan.create(req.body);
  res.status(201).json(item);
};
export const updateOne = async (req, res) => {
  const item = await Plan.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
};
export const deleteOne = async (req, res) => {
  const item = await Plan.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted successfully" });
};
