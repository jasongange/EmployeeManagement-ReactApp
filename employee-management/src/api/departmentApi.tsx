import type { Department } from "../types/department";
import axios from "axios";

const API_URL = "http://localhost:5145/Departments";

export const getDepartments = async (): Promise<Department[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};