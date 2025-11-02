import EditEmployee from "./EditEmployeeCSR";
import { EmployeeType } from "@/app/lib/mockDataEmp";
import { mockEmployees } from "@/app/lib/mockDataEmp";
import { mockDepartments, mockDivisions } from "@/app/lib/mockDataDepDiv";
import { structureClientHierarchy } from "@/app/lib/utils";
import { mockPositions } from "@/app/lib/mockPosition";

export default function EditEmployeePage({ params }: { params: { "emp-id": string } }) {
  const employee = mockEmployees.find(e => e.employee_id.toString() === params["emp-id"]);
  const supervisor = employee?.supervisor_id ? mockEmployees.find(e => e.employee_id === employee.supervisor_id) : null;
  const isSupervisor = mockEmployees.some(e => e.supervisor_id === employee?.employee_id);
  console.log("Employee:", employee);
  console.log("Supervisor:", supervisor);

  const divisionHierarchy = structureClientHierarchy(mockDivisions, mockDepartments);


  if (!employee) return <h1>Employee not found</h1>;


  return <EditEmployee employee={employee} supervisor={supervisor ?? undefined} isSupervisor={isSupervisor} orgHierarchyData={divisionHierarchy} allEmployees={mockEmployees} allPositions={mockPositions} />;

}
