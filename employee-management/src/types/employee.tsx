export interface EmployeeResponse extends EmployeeRequest {
  department: string;
};

export interface EmployeeRequest {
  id: string;
  firstName: string;
  lastName: string;
  employeeNumber: string;
  salary: number;
  departmentId: string;
};