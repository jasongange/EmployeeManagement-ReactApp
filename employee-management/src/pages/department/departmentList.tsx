import type { Department } from "../../types/department";
import { useEffect, useState } from "react";
import { getDepartments } from "../../api/departmentApi";
import Table, { type Column } from "../../components/common/table";

const DepartmentList = () =>{
  const [departments, setDepartments] = useState<Department[]>([]);

  const loadDepartments = async () => {
    const data = await getDepartments();
    setDepartments(data);
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const columns: Column<Department>[] = [
    { header: 'Name', accessor: 'name' }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
       <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Department List</h1>
       </div>
       <Table columns={columns} data={departments} keyExtractor={(department) => department.id} />
    </div>
  );
};

export default DepartmentList;
