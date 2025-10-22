import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEmployee, getPaginatedResult, createEmployee, updateEmployee, deleteEmployee } from "./employeeApi";
import type { EmployeeRequest } from "../../types/employee";

export const useGetEmployee = (id?: string) => {
  return useQuery({
    queryKey: ['Employees', id],
    queryFn: () => getEmployee(id!),
    enabled: !!id,
  });
};

export const useGetPaginatedResult = (limit: number, skip: number ) => {
  return useQuery({
    queryKey: ["Employees", limit, skip],
    queryFn: () => getPaginatedResult(limit, skip),
  });
};

export const useCreateEmployee = () => {
     const queryClient = useQueryClient();  
  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Employees'] });
    },
    onError: (error) => {
      console.error('Error creating employee:', error);
    },
  });
};

export const useUpdateEmployee = () => {
     const queryClient = useQueryClient();  
  return useMutation({
    mutationFn: ({ id, employee }: { id: string; employee: EmployeeRequest }) =>
      updateEmployee(id, employee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Employees'] });
    },
    onError: (error) => {
      console.error('Error updating employee:', error);
    },
  });
};

export const useDeleteEmployee = () => {
const queryClient = useQueryClient();  
  return useMutation({
    mutationFn: (id: string) => deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Employees'] });
    },
    onError: (error) => {
      console.error('Error deleting employee:', error);
    },
  });
};
