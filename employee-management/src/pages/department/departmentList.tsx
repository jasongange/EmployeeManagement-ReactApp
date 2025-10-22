import type { Department } from "../../types/department";
import { useState } from "react";
import { useGetPaginatedResult } from "../../api/departments/hook";
import Table, { type Column } from "../../components/common/table";

const DepartmentList = () =>{

  const [skip, setSkip] = useState(0);
  const limit = 3;

  const { data } = useGetPaginatedResult(limit, skip);

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
        data={data?.items ?? []} 
        keyExtractor={(department) => department.id} 
        skip={skip}
        limit={limit}
        totalCount={data?.totalCount ?? 0}
        onPageChange={(newSkip) => setSkip(newSkip)}
        />
    </div>
  );
};

export default DepartmentList;
