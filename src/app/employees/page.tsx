import EmployeesCSR from "./EmployeesCSR";
import { mockEmployees } from "@/app/lib/mockDataEmp";
// 1. Import data and utility
import { mockDepartments, mockDivisions } from "@/app/lib/mockDataDepDiv";
import { structureClientHierarchy } from "@/app/lib/utils";
import type { Employee } from "@/types/employee";
import type { EmployeeWithNames } from "@/types/employeeWithNames";

export default async function EmployeesPage() {
  const res = await fetch(`${process.env.APP_ORIGIN}/api/employees/with-names`, {
    cache: "no-store",
  });
  const employees: EmployeeWithNames[] = await res.json();
  
  // 2. Create the hierarchy object
  const orgHierarchyData = structureClientHierarchy(mockDivisions, mockDepartments);
  
  // 3. Pass both initialRows and orgHierarchyData to the client
  return <EmployeesCSR 
    initialRows={employees} 
    orgHierarchyData={orgHierarchyData} 
  />;
}