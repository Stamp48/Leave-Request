import Subordinates from "./SubordinatesCSR";
import { mockEmployees } from "@/app/lib/mockDataEmp";
// 1. Import division/department mock data
import { mockDepartments, mockDivisions } from "@/app/lib/mockDataDepDiv";

export default function SubordinatesPage({ params }: { params: { "emp-id": string } }) {
  const currEmployee = mockEmployees.find(e => e.employee_id.toString() === params["emp-id"]);
  if (!currEmployee) {
    return <div>Employee not found</div>;
  }
  
  // 2. Find all subordinates
  const initialRows = mockEmployees.filter(e => e.supervisor_id === currEmployee?.employee_id);

  // 3. Find the current employee's division ID
  const division = mockDivisions.find(d => d.division_name === currEmployee.division);

  // 4. Find all departments in that division
  let departmentsInDivision: string[] = [];
  if (division) {
    departmentsInDivision = mockDepartments
      .filter(dept => dept.division_id === division.division_id)
      .map(dept => dept.department_name);
  }

  // 5. Pass the new list to the client
  return <Subordinates 
    initialRows={initialRows} 
    currEmployee={currEmployee} 
    departmentsInDivision={departmentsInDivision} 
  />;
}
