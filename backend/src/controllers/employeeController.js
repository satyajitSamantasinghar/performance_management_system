const MonthlyPlan = require("../models/MonthlyPlan");
const AuditLog = require("../models/AuditLog");

exports.submitMonthlyPlan = async (req, res) => {
  try {
    const { month, planDetails } = req.body;

    const plan = await MonthlyPlan.create({
      employeeId: req.user.userId,
      month,
      planDetails
    });

    await AuditLog.create({
      userId: req.user.userId,
      action: "SUBMIT",
      entityType: "MONTHLY_PLAN",
      entityId: plan._id,
      ipAddress: req.ip
    });

    res.status(201).json({
  message: "Monthly plan submitted",
  monthlyPlanId: plan._id
});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const MonthlyAchievement = require("../models/MonthlyAchievement");

exports.submitMonthlyAchievement = async (req, res) => {
  try {
    const { monthlyPlanId, achievementDetails } = req.body;

    const achievement = await MonthlyAchievement.create({
      employeeId: req.user.userId,
      monthlyPlanId,
      achievementDetails
    });

    await AuditLog.create({
      userId: req.user.userId,
      action: "SUBMIT",
      entityType: "MONTHLY_ACHIEVEMENT",
      entityId: achievement._id,
      ipAddress: req.ip
    });

    res.status(201).json({ message: "Monthly achievement submitted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const YearlyPlan = require("../models/YearlyPlan");

exports.submitYearlyPlan = async (req, res) => {
  try {
    const { financialYear, planDetails } = req.body;

    const plan = await YearlyPlan.create({
      employeeId: req.user.userId,
      financialYear,
      planDetails
    });

    await AuditLog.create({
      userId: req.user.userId,
      action: "SUBMIT",
      entityType: "YEARLY_PLAN",
      entityId: plan._id,
      ipAddress: req.ip
    });

    res.status(201).json({ message: "Yearly plan submitted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


