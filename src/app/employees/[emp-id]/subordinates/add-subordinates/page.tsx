import Addsubordinates from "./addSubordinatesCSR";
import { EmployeeType } from "@/app/employees/page";
import { mockEmployees } from "@/app/lib/mockDataEmp";



 
export default function addSubordinatesPage({ params }: { params: { "emp-id": string } }) {
      const currEmployee = mockEmployees.find(e => e.id.toString() === params["emp-id"]);
      if (!currEmployee) {
        return <div>Employee not found</div>;
      }

    return <Addsubordinates initialRows={mockEmployees} currEmployee={currEmployee}/>;
}