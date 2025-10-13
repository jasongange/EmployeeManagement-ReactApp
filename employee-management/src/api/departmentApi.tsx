import type { Department } from "../types/department";
import axios from "axios";
import type { PaginatedResponse } from "../types/paginatedResult";

const API_URL = "http://localhost:5145/Departments";

export const getDepartments = async (): Promise<Department[]> => {
  const response = await axios.get(`${API_URL}/GetDepartments`);
  return response.data;
};

export const getPaginatedResult = async (limit: number, skip: number): Promise<PaginatedResponse<Department>> => {
  const params = { limit: limit.toString(), skip: skip.toString() };
  const response = await axios.get(`${API_URL}/GetPaginatedDepartments`, { params });
  return response.data;
};