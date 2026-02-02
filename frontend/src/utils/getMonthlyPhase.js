export const getMonthlyPhase = () => {
  const today = new Date();
  const day = today.getDate();

  if (day >= 1 && day <= 7) return "PLAN";
  if (day >= 25) return "ACHIEVEMENT";
  return "LOCKED";
};
