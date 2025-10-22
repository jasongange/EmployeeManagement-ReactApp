import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { EmployeeRequest } from '../../types/employee';
import Input from '../../components/common/input';
import Button from '../../components/common/button';
import SelectInput from '../../components/common/selectInput';
import { useGetDepartments } from '../../api/departments/hook';
import { useCreateEmployee, useUpdateEmployee, useGetEmployee } from '../../api/employees/hook';

const EmployeeForm = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { data: employee } = useGetEmployee(id);
  const { data: departments } = useGetDepartments();

  const { mutate: createMutate  } = useCreateEmployee();
  const { mutate: updateMutate  } = useUpdateEmployee();


  const [formData, setFormData] = useState<EmployeeRequest>({
    id: '',
    firstName: '',
    lastName: '',
    employeeNumber: '',
    salary: 0,
    departmentId: 'D001'
  });

  useEffect(() => {
  if (employee) {
    const fetchData = async () => {
      setFormData(
        {
          id: employee.id, 
          employeeNumber : employee.employeeNumber,
          firstName : employee.firstName,
          lastName : employee.lastName,
          salary : employee.salary,
          departmentId : employee.departmentId,
        });
    };
    fetchData();
  }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      updateMutate({ id: id, employee: formData });
    } else {
      createMutate(formData)
    }
    navigate('/');
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">
        {id ? `Edit Employee` : 'Create Employee'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="text" name='employeeNumber' label='Employee Number' value={formData.employeeNumber} onChange={handleChange}/>
        <Input type="text" name='firstName' label="First Name" value={formData.firstName} onChange={handleChange}/>
        <Input type="text" name='lastName' label="Last Name" value={formData.lastName} onChange={handleChange}/>
        <Input type="number" name='salary' label="Salary" value={formData.salary} onChange={handleChange}/>
        <SelectInput name='departmentId' label='Department' value={formData.departmentId} onChange={handleChange} options={departments ?? []}/>
        <Button color="blue" label={id ? "Update" : "Create"} type="submit"/>
      </form>
    </div>
  );
};

export default EmployeeForm;
