import api from "./axiosInstance";

export const addExpense = (data) =>
  api.post("/expenses", data);
