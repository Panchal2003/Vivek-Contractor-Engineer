const Machinery = require("../models/Machinery");

const listMachinery = async (_req, res, next) => {
  try {
    const machinery = await Machinery.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json(machinery);
  } catch (error) {
    next(error);
  }
};

const createMachinery = async (req, res, next) => {
  try {
    const machinery = await Machinery.create(req.body);
    res.status(201).json(machinery);
  } catch (error) {
    next(error);
  }
};

const updateMachinery = async (req, res, next) => {
  try {
    const updated = await Machinery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Machinery item not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

const deleteMachinery = async (req, res, next) => {
  try {
    const deleted = await Machinery.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Machinery item not found" });
    }

    res.status(200).json({ message: "Machinery deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listMachinery,
  createMachinery,
  updateMachinery,
  deleteMachinery,
};
