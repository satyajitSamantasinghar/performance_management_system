import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMonthlyPhase } from "../utils/getMonthlyPhase";

const MonthlyReport = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const phase = getMonthlyPhase();

    if (phase === "PLAN") {
      navigate("/employee/monthly-plan");
    } else if (phase === "ACHIEVEMENT") {
      navigate("/employee/monthly-achievement");
    } else {
      navigate("/employee/monthly-plan/view");
    }
  }, [navigate]);

  return null;
};

export default MonthlyReport;
