const mongoose = require("mongoose");

const quarterlyEvaluationSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  quarter: {
    type: String, // "Q1-2026"
    required: true
  },

  raId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  averageScore: {
    type: Number,
    required: true
  },

  generatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  "QuarterlyEvaluation",
  quarterlyEvaluationSchema
);
