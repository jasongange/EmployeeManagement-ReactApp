import { useNavigate } from "react-router-dom";
import type { EmployeeResponse } from "../../types/employee";
import Button from "../../components/common/button";
import { useState } from "react";
import Table, { type Column } from "../../components/common/table";
import { useDeleteEmployee, useGetPaginatedResult } from "../../api/employees/hook";

const EmployeeList = () =>{
  const navigate = useNavigate();

  const [skip, setSkip] = useState(0);
  const limit = 5;

  const { data: employees } = useGetPaginatedResult(limit, skip);
  const { mutate: deleteMutate  } = useDeleteEmployee();

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
    deleteMutate(id);
    }
  };

  const handleAdd = () => {
    navigate('/create');
  };

  const columns: Column<EmployeeResponse>[] = [
    { header: 'Employee Number', accessor: 'employeeNumber' },
    { header: 'First Name', accessor: 'firstName' },
    { header: 'Last Name', accessor: 'lastName' },
    { header: 'Salary', accessor: 'salary' },
    { header: 'Department', accessor: 'department' },
    {
      header: 'Actions',
      accessor: 'id',
      render: (_: any, row: EmployeeResponse) => (
        <>
        <Button color="gray" label="Edit" type="button" onClick={() => handleEdit(row.id)}/>
        <Button color="red" label="Delete" type="button" onClick={() => handleDelete(row.id)}/>
        </>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employee List</h1>
        <Button color="green" label="Add" type="button" onClick={handleAdd}/>
      </div>
      <Table 
        columns={columns} 
        data={employees?.items ?? []} 
        keyExtractor={(employee) => employee.id} 
        skip={skip}
        limit={limit}
        totalCount={employees?.totalCount ?? 0}
        onPageChange={(newSkip) => setSkip(newSkip)}
        />
    </div>
  );
};

export default EmployeeList;
