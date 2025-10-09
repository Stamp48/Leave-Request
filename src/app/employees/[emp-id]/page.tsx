import Employee from "./EmployeeCSR";
import { mockEmployees } from "@/app/lib/mockDataEmp";




export default function EmployeePage({ params }: { params: { "emp-id": string } }) {
  const employee = mockEmployees.find(e => e.id.toString() === params["emp-id"]);
  const supervisor = employee?.supervisorId ? mockEmployees.find(e => e.id === employee.supervisorId) : null;
  const isSupervisor = mockEmployees.some(e => e.supervisorId === employee?.id);
  console.log("Employee:", employee);
  console.log("Supervisor:", supervisor);


  if (!employee) return <h1>Employee not found</h1>;


  return <Employee employee={employee} supervisor={supervisor ?? undefined} isSupervisor={isSupervisor}/>;

}
