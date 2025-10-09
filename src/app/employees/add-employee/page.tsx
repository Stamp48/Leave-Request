import AddEmployee from "./AddEmployeeCSR";
import { DepartmentType, DivisionType } from "@/app/lib/mockDataDepDiv";
import { structureDataForClient } from "@/app/lib/utils"; // <-- Import the function
import { mockDepartments, mockDivisions } from "@/app/lib/mockDataDepDiv";
import { mockEmployees } from "@/app/lib/mockDataEmp"; 






export default function addPage() {
  const departmentDataForClient = structureDataForClient(mockDepartments, mockDivisions);

  return <AddEmployee departmentData={departmentDataForClient} existingEmployees={mockEmployees}/>;

}