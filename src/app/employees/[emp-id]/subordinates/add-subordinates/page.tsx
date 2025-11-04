import Addsubordinates from "./addSubordinatesCSR";
import { EmployeeType } from "@/app/lib/mockDataEmp";
import { mockEmployees } from "@/app/lib/mockDataEmp";




export default function addSubordinatesPage({ params }: { params: { "emp-id": string } }) {
  const currEmployee = mockEmployees.find(e => e.employee_id.toString() === params["emp-id"]);
  if (!currEmployee) {
    return <div>Employee not found</div>;
  }

  return <Addsubordinates initialRows={mockEmployees} currEmployee={currEmployee} />;
}