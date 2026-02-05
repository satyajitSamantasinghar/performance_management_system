import api from "./axios";

// Get monthly evaluations
export const getMonthlyEvaluations = () => {
  return api.get("/ra/monthly-evaluations");
};

// Get quarterly evaluations
export const getQuarterlyEvaluations = () => {
  return api.get("/ra/quarterly-evaluations");
};


export const getMonthlyEvaluationById = (id) => {
  return api.get(`/ra/monthly-evaluations/${id}`);
};

export const submitMonthlyEvaluation = (payload) => {
  return api.post("/ra/monthly-evaluation", payload);
};


