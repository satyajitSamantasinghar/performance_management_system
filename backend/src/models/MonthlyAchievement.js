const User = require("../models/User");
const MonthlyPlan = require("../models/MonthlyPlan");

const mongoose = require("mongoose");

const monthlyAchievementSchema = new mongoose.Schema(
  {
    employeeCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    monthlyPlanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MonthlyPlan",
      required: true,
      index: true
    },

    achievementDetails: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },

    submittedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false
  }
);

monthlyAchievementSchema.index(
  { monthlyPlanId: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "MonthlyAchievement",
  monthlyAchievementSchema
);
const mongoose = require("mongoose");

const monthlyAchievementSchema = new mongoose.Schema({
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

  achievementDetails: {
    type: String,
    required: true
  },

  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("MonthlyAchievement", monthlyAchievementSchema);
