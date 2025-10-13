import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { EmployeeRequest } from '../../types/employee';
import { createEmployee, getEmployee, updateEmployee } from '../../api/employeeApi';
import Input from '../../components/common/input';
import Button from '../../components/common/button';
import SelectInput from '../../components/common/selectInput';
import type { Department } from '../../types/department';
import { getDepartments } from '../../api/departmentApi';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [departments, setDepartments] = useState<Department[]>([]);

  const [formData, setFormData] = useState<EmployeeRequest>({
    id: '',
    firstName: '',
    lastName: '',
    employeeNumber: '',
    salary: 0,
    departmentId: 'D001'
  });

  const loadDepartments = async () => {
    const data = await getDepartments();
    setDepartments(data);
  };
  
  useEffect(() => {
    loadDepartments();
  }, []);

  useEffect(() => {
  if (id) {
    const fetchData = async () => {
      const employee = await getEmployee(id);
      setFormData(
        {
          id: employee.department, 
          employeeNumber : employee.employeeNumber,
          firstName : employee.firstName,
          lastName : employee.lastName,
          salary : employee.salary,
          departmentId : employee.departmentId,
        });
    };
    fetchData();
  }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await updateEmployee(id, formData);
    } else {
      console.log(formData)
      await createEmployee(formData);
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
        <SelectInput name='departmentId' label='Department' value={formData.departmentId} onChange={handleChange} options={departments} />
        <Button color="blue" label={id ? "Update" : "Create"} type="submit"/>
      </form>
    </div>
  );
};

export default EmployeeForm;
