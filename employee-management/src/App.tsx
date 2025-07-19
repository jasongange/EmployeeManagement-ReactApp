import Sidebar from "./components/sidebar";
import { Route, Routes } from "react-router-dom";
import EmployeeForm from "./pages/employee/employeeForm";
import EmployeeList from "./pages/employee/employeeList";
import DepartmentList from "./pages/department/departmentList";

const App = () => {

  return (
    <div className="flex">
      <Sidebar title="Employee Management" color="gray" />
      <main className="ml-64 p-6 flex-1 bg-gray-100 min-h-screen">
          <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/create" element={<EmployeeForm />} />
          <Route path="/edit/:id" element={<EmployeeForm />} />
          <Route path="/department" element={<DepartmentList />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
