const MonthlyEvaluation = require("../models/MonthlyEvaluation");
const QuarterlyEvaluation = require("../models/QuarterlyEvaluation");
const AuditLog = require("../models/AuditLog");

exports.submitMonthlyEvaluation = async (req, res) => {
  try {
    const { employeeId, monthlyPlanId, month, score, remarks } = req.body;

    const evaluation = await MonthlyEvaluation.create({
      employeeId,
      monthlyPlanId,
      raId: req.user.userId,
      month,
      score,
      remarks
    });

    await AuditLog.create({
      userId: req.user.userId,
      action: "EVALUATE",
      entityType: "MONTHLY_EVALUATION",
      entityId: evaluation._id,
      ipAddress: req.ip
    });

    res.status(201).json({ message: "Monthly evaluation submitted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.generateQuarterlyEvaluation = async (req, res) => {
  try {
    const { employeeId, quarter, months } = req.body;
    // months = ["2026-01", "2026-02", "2026-03"]

    const evaluations = await MonthlyEvaluation.find({
      employeeId,
      month: { $in: months }
    });

    if (evaluations.length === 0) {
      return res.status(400).json({ message: "No monthly evaluations found" });
    }

        const totalScore = evaluations.reduce(
    (sum, evaluation) => sum + evaluation.score,
    0
    );  


    const averageScore = totalScore / evaluations.length;

    const quarterly = await QuarterlyEvaluation.create({
      employeeId,
      quarter,
      raId: req.user.userId,
      averageScore
    });

    await AuditLog.create({
      userId: req.user.userId,
      action: "GENERATE",
      entityType: "QUARTERLY_EVALUATION",
      entityId: quarterly._id,
      ipAddress: req.ip
    });

    res.json({
      message: "Quarterly evaluation generated",
      averageScore
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
