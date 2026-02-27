const Inquiry = require("../models/Inquiry");

const listInquiries = async (_req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (error) {
    next(error);
  }
};

const createInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json(inquiry);
  } catch (error) {
    next(error);
  }
};

const updateInquiryStatus = async (req, res, next) => {
  try {
    const updated = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

const deleteInquiry = async (req, res, next) => {
  try {
    const deleted = await Inquiry.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    res.status(200).json({ message: "Inquiry deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listInquiries,
  createInquiry,
  updateInquiryStatus,
  deleteInquiry,
};
