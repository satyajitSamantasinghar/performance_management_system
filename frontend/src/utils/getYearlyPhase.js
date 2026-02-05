export const getYearlyPhase = () => {
  const today = new Date();
  const month = today.getMonth(); 
  const day = today.getDate();

  if (month === 3 && day >= 1 && day <= 14) {
    return "PLAN";
  }

  if (month === 2 && day >= 15 && day <= 30) {
    return "ACHIEVEMENT";
  }

  return "LOCKED";
};
