import type { Department } from "../../types/department";
import { useEffect, useState } from "react";
import { getPaginatedResult } from "../../api/departmentApi";
import Table, { type Column } from "../../components/common/table";

const DepartmentList = () =>{
  const [departments, setDepartments] = useState<Department[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [skip, setSkip] = useState(0);
  const limit = 3;

  const loadDepartments = async () => {
    const data = await getPaginatedResult(limit, skip);
    setDepartments(data.items);
    setTotalCount(data.totalCount)
  };

  useEffect(() => {
    loadDepartments();
  }, [skip]);

  const columns: Column<Department>[] = [
    { header: 'Name', accessor: 'name' }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
       <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Department List</h1>
       </div>
       <Table 
        columns={columns} 
        data={departments} 
        keyExtractor={(department) => department.id} 
        skip={skip}
        limit={limit}
        totalCount={totalCount}
        onPageChange={(newSkip) => setSkip(newSkip)}
        />
    </div>
  );
};

export default DepartmentList;
