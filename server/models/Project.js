const mongoose = require("../config/mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    location: { type: String, default: "", trim: true },
    category: { type: String, default: "General", trim: true },
    image: { type: String, default: "" },
    completed: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
