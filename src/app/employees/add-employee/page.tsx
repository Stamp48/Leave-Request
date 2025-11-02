import AddEmployee from "./AddEmployeeCSR";
import { structureClientHierarchy } from "@/app/lib/utils"; 
import { mockDepartments, mockDivisions } from "@/app/lib/mockDataDepDiv";
import { mockEmployees } from "@/app/lib/mockDataEmp";
// 1. Import mockPositions
import { mockPositions } from "@/app/lib/mockPosition"; // Assuming this is the correct path

export default function addPage() {
  // 2. This function creates the Record<DivisionName, DepartmentName[]>
  const orgHierarchyData = structureClientHierarchy(mockDivisions, mockDepartments);

  // 3. Pass all data to the client component
  return <AddEmployee 
    orgHierarchyData={orgHierarchyData} 
    existingEmployees={mockEmployees} 
    allPositions={mockPositions} // 4. Pass positions
  />;
}
