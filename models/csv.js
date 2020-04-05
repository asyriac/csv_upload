const mongoose = require("mongoose");

const csvSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const Csv = mongoose.model("Csv", csvSchema);

module.exports = Csv;
