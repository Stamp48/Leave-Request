import AddEmployee from "./AddEmployeeCSR";
import { structureClientHierarchy } from "@/app/lib/utils"; 
import type { Department } from "@/types/department";
import type { Division } from "@/types/division";
import { EmployeeWithNames } from "@/types/employeeWithNames";
import { Position } from "@/types/position";

export default async function addPage() {

  const [empRes, posRes, divRes, depRes] = await Promise.all([
    fetch(`${process.env.APP_ORIGIN}/api/employees/with-names`, { cache: "no-store" }),
    fetch(`${process.env.APP_ORIGIN}/api/positions`, { cache: "no-store" }),
    fetch(`${process.env.APP_ORIGIN}/api/divisions`, { cache: "no-store" }),
    fetch(`${process.env.APP_ORIGIN}/api/departments`, { cache: "no-store" }),
  ]);

  if (!empRes.ok) {
    throw new Error("Failed to fetch employees");
  }

  if (!posRes.ok) {
    throw new Error("Failed to fetch positions");
  }

  if (!divRes.ok) {
    throw new Error("Failed to fetch divisions");
  }

  if (!depRes.ok) {
    throw new Error("Failed to fetch departments");
  }

  const [employees, positions, divisions, departments]: [
    EmployeeWithNames[],
    Position[],
    Division[],
    Department[],
  ] = await Promise.all([empRes.json(), posRes.json() ,divRes.json(), depRes.json()]);

  // 2. This function creates the Record<DivisionName, DepartmentName[]>
  const orgHierarchyData = structureClientHierarchy(divisions, departments);

  // 3. Pass all data to the client component
  return <AddEmployee 
    orgHierarchyData={orgHierarchyData} 
    existingEmployees={employees} 
    allPositions={positions}
    allDepartments={departments}
  />;
}
