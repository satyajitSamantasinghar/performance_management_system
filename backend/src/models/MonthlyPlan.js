const User = require("../models/User");

const mongoose = require("mongoose");

const monthlyPlanSchema = new mongoose.Schema(
  {
    employeeCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    month: {
      type: String,
      required: true,
      index: true
    },

    planDetails: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING"
    },

    mdRemarks: {
      type: String,
      default: null
    },

    version: {
      type: Number,
      default: 1
    },

    submittedAt: {
      type: Date,
      default: Date.now
    },

    approvedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: false
  }
);

monthlyPlanSchema.index(
  { employeeId: 1, month: 1, version: 1 },
  { unique: true }
);
const mongoose = require("mongoose");

const monthlyPlanSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  month: {
    type: String, // e.g. "2026-01"
    required: true
  },

  planDetails: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING"
  },

  mdRemarks: String,

  version: {
    type: Number,
    default: 1
  },

  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("MonthlyPlan", monthlyPlanSchema);
