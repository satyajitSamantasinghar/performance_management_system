
export const getCurrentMonth = () => {
  return new Date().toISOString().slice(0, 7); // YYYY-MM
};
