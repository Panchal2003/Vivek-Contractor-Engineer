const mongoose = require("../config/mongoose");

const machinerySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    category: { type: String, default: "General", trim: true },
    image: { type: String, default: "" },
    imageFit: {
      type: String,
      enum: ["cover", "contain"],
      default: "cover",
    },
    status: {
      type: String,
      enum: ["available", "in-use", "maintenance"],
      default: "available",
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Machinery", machinerySchema);
