const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const {
  allowMonthlyPlanSubmission,
  allowMonthlyAchievementSubmission
} = require("../middleware/dateMiddleware");

const employeeController = require("../controllers/employeeController");

router.post(
  "/monthly-plan",
  verifyToken,
  authorizeRoles("EMPLOYEE"),
  allowMonthlyPlanSubmission,
  employeeController.submitMonthlyPlan
);

router.post(
  "/monthly-achievement",
  verifyToken,
  authorizeRoles("EMPLOYEE"),
  allowMonthlyAchievementSubmission,
  employeeController.submitMonthlyAchievement
);

router.post(
  "/yearly-plan",
  verifyToken,
  authorizeRoles("EMPLOYEE"),
  employeeController.submitYearlyPlan
);

module.exports = router;
