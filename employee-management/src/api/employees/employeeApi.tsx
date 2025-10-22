import type { EmployeeRequest, EmployeeResponse } from "../../types/employee";
import axios from "axios";
import type { PaginatedResponse } from "../../types/paginatedResult";

const API_URL = "http://localhost:5145/Employees";

export const getPaginatedResult = async (limit: number, skip: number): Promise<PaginatedResponse<EmployeeResponse>> => {
  const params = { limit: limit.toString(), skip: skip.toString() };
  const response = await axios.get(`${API_URL}/GetPaginatedEmployees`, { params });
  return response.data;
};

export const getEmployee = async (id: string): Promise<EmployeeResponse> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createEmployee = async (employee: EmployeeRequest): Promise<EmployeeRequest> => {
  const response = await axios.post(API_URL, employee);
  return response.data;
};

export const updateEmployee = async (id: string, employee: EmployeeRequest): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, employee);
};

export const deleteEmployee = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
