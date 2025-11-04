import EmployeesCSR from "./EmployeesCSR";
import { mockEmployees } from "@/app/lib/mockDataEmp";
// 1. Import data and utility
import { mockDepartments, mockDivisions } from "@/app/lib/mockDataDepDiv";
import { structureClientHierarchy } from "@/app/lib/utils";

export default async function EmployeesPage() {
  
  // 2. Create the hierarchy object
  const orgHierarchyData = structureClientHierarchy(mockDivisions, mockDepartments);

  // 3. Pass both initialRows and orgHierarchyData to the client
  return <EmployeesCSR 
    initialRows={mockEmployees} 
    orgHierarchyData={orgHierarchyData} 
  />;
}
