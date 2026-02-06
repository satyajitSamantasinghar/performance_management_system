const MonthlyPlan = require("../models/MonthlyPlan");
const AuditLog = require("../models/AuditLog");
const YearlyPlan = require("../models/YearlyPlan");
const MonthlyAchievement = require("../models/MonthlyAchievement");
const YearlyAchievement=require("../models/YearlyAchievement");

exports.submitMonthlyPlan = async (req, res) => {
  try {
    const { month, planDetails } = req.body;

    const existingPlan = await MonthlyPlan.findOne({
      employeeId: req.user.userId,
      month
    });

    if (existingPlan) {
      return res.status(409).json({
        message: "Monthly plan already submitted for this month"
      });
    }

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




exports.submitMonthlyAchievement = async (req, res) => {
  try {
    const { monthlyPlanId, achievementDetails } = req.body;

    const plan = await MonthlyPlan.findOne({
      _id: monthlyPlanId,
      employeeId: req.user.userId
    });

    if (!plan) {
      return res.status(404).json({
        message: "Monthly plan not found for this employee"
      });
    }

    const existingAchievement = await MonthlyAchievement.findOne({
      employeeId: req.user.userId,
      monthlyPlanId: plan._id
    });


    if (existingAchievement) {
      return res.status(409).json({
        message: "Monthly achievement already submitted for this month"
      });
    }

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



exports.submitYearlyPlan = async (req, res) => {
  try {
    const { financialYear, planDetails } = req.body;

    const existingPlan = await YearlyPlan.findOne({
      employeeId: req.user.userId,
      financialYear
    });

    if (existingPlan) {
      return res.status(409).json({
        message: "Yearly plan already submitted for this financial year"
      });
    }

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

exports.getMonthlyPlans = async (req, res) => {
  try {
    let filter = {};

    // EMPLOYEE → only own data
    if (req.user.role === "EMPLOYEE") {
      filter.employeeId = req.user.userId;
    }

    // Optional query filters (month, employeeId)
    if (req.query.month) {
      filter.month = req.query.month;
    }

    if (req.query.employeeId && req.user.role !== "EMPLOYEE") {
      filter.employeeId = req.query.employeeId;
    }

    const plans = await MonthlyPlan.find(filter)
      .populate("employeeId", "name employeeCode department")
      .sort({ submittedAt: -1 });

    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch monthly plans" });
  }
};

exports.getMonthlyAchievements = async (req, res) => {
  try {
    let filter = {};

    // EMPLOYEE → only own achievements
    if (req.user.role === "EMPLOYEE") {
      filter.employeeId = req.user.userId;
    }

    // Optional query filters
    if (req.query.monthlyPlanId) {
      filter.monthlyPlanId = req.query.monthlyPlanId;
    }

    if (req.query.employeeId && req.user.role !== "EMPLOYEE") {
      filter.employeeId = req.query.employeeId;
    }

    const achievements = await MonthlyAchievement.find(filter)
      .populate("employeeId", "name employeeCode department")
      .populate("monthlyPlanId", "month planDetails")
      .sort({ submittedAt: -1 });

    res.json(achievements);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch monthly achievements"
    });
  }
};


exports.getYearlyPlans = async (req, res) => {
  try {
    const plans = await YearlyPlan.find({
      employeeId: req.user.userId
    }).sort({ createdAt: -1 });

    res.json(plans);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch yearly plans"
    });
  }
};



exports.submitYearlyAchievement = async (req, res) => {
  try {
    const { yearlyPlanId, tasksCompleted, additionalTasks } = req.body;

    // 1️⃣ Check yearly plan exists & belongs to employee
    const plan = await YearlyPlan.findOne({
      _id: yearlyPlanId,
      employeeId: req.user.userId
    });

    if (!plan) {
      return res.status(404).json({
        message: "Yearly plan not found"
      });
    }

    // 2️⃣ Prevent duplicate yearly achievement
    const existingAchievement = await YearlyAchievement.findOne({
      employeeId: req.user.userId,
      yearlyPlanId
    });

    if (existingAchievement) {
      return res.status(409).json({
        message: "Yearly achievement already submitted"
      });
    }

    // 3️⃣ Create achievement
    const achievement = await YearlyAchievement.create({
      employeeId: req.user.userId,
      yearlyPlanId,
      tasksCompleted,
      additionalTasks
    });

    await AuditLog.create({
      userId: req.user.userId,
      action: "SUBMIT",
      entityType: "YEARLY_ACHIEVEMENT",
      entityId: achievement._id,
      ipAddress: req.ip
    });

    res.status(201).json({
      message: "Yearly achievement submitted successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



