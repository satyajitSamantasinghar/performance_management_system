const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const raController = require("../controllers/raController");

router.post(
  "/monthly-evaluation",
  verifyToken,
  authorizeRoles("RA"),
  raController.submitMonthlyEvaluation
);

router.post(
  "/quarterly-evaluation",
  verifyToken,
  authorizeRoles("RA"),
  raController.generateQuarterlyEvaluation
);

module.exports = router;
