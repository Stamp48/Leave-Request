import Subordinates from "./SubordinatesCSR";
import { mockEmployees } from "@/app/lib/mockDataEmp";




export default function SubordinatesPage({ params }: { params: { "emp-id": string } }) {
  const currEmployee = mockEmployees.find(e => e.id.toString() === params["emp-id"]);
  if (!currEmployee) {
    return <div>Employee not found</div>;
  }

  return <Subordinates initialRows={mockEmployees} currEmployee={currEmployee} />;
}