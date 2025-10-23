import EditEmployee from "./EditEmployeeCSR";
import { EmployeeType } from "@/app/employees/page";
import { mockEmployees } from "@/app/lib/mockDataEmp";
import { mockDepartments, mockDivisions } from "@/app/lib/mockDataDepDiv";
import { structureDataForClient } from "@/app/lib/utils";
import { getSupervisorsByDepartment } from "@/app/lib/utils";

export default function EmployeePage({ params }: { params: { "emp-id": string } }) {
  const employee = mockEmployees.find(e => e.id.toString() === params["emp-id"]);
  const supervisor = employee?.supervisorId ? mockEmployees.find(e => e.id === employee.supervisorId) : null;
  const isSupervisor = mockEmployees.some(e => e.supervisorId === employee?.id);
  console.log("Employee:", employee);
  console.log("Supervisor:", supervisor);
  
  const departmentDataForClient = structureDataForClient(mockDepartments, mockDivisions);
  const supervisorsInDept = getSupervisorsByDepartment(mockEmployees, employee?.department || "");


  if (!employee) return <h1>Employee not found</h1>;


  return <EditEmployee employee={employee} supervisor={supervisor ?? undefined} isSupervisor={isSupervisor} departmentData={departmentDataForClient} supervisorsInDept={supervisorsInDept}/>;

}
