import { useQuery } from "@tanstack/react-query";
import { getDepartments, getPaginatedResult } from "./departmentApi";

export const useGetDepartments = () => {
  return useQuery({
    queryKey: ['Departments'],
    queryFn: () => getDepartments()
  });
};

export const useGetPaginatedResult = (limit: number, skip: number ) => {
  return useQuery({
    queryKey: ["Departments", limit, skip],
    queryFn: () => getPaginatedResult(limit, skip)
  });
};