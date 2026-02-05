const mongoose = require("mongoose");

const monthlyEvaluationSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  monthlyPlanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MonthlyPlan",
    required: true
  },

  raId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  month: {
    type: String, // "2026-01"
    required: true
  },

  score: {
    type: Number,
    min: 0,
    max: 10,
    required: true
  },

  remarks: {
    type: String
  },

  evaluatedAt: {
    type: Date,
    default: Date.now
  },
  monthlyAchievementId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "MonthlyAchievement"
}

});

module.exports = mongoose.model("MonthlyEvaluation", monthlyEvaluationSchema);
