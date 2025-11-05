import EmployeesCSR from "./EmployeesCSR";
import { structureClientHierarchy } from "@/app/lib/utils";
import type { EmployeeWithNames } from "@/types/employeeWithNames";
import type { Department } from "@/types/department";
import type { Division } from "@/types/division";

export default async function EmployeesPage() {
  // ใช้ URL แบบ relative ก็ได้ใน Server Component (เลี่ยงปัญหา APP_ORIGIN ว่าง)
  const [empRes, divRes, depRes] = await Promise.all([
    fetch(`${process.env.APP_ORIGIN}/api/employees/with-names`, { cache: "no-store" }),
    fetch(`${process.env.APP_ORIGIN}/api/divisions`, { cache: "no-store" }),
    fetch(`${process.env.APP_ORIGIN}/api/departments`, { cache: "no-store" }),
  ]);

  if (!empRes.ok) {
    throw new Error("Failed to fetch employees");
  }

  if (!divRes.ok) {
    throw new Error("Failed to fetch divisions");
  }


  if (!empRes.ok || !divRes.ok || !depRes.ok) {
    throw new Error("Failed to fetch employees/divisions/departments");
  }

  const [employees, divisions, departments]: [
    EmployeeWithNames[],
    Division[],
    Department[]
  ] = await Promise.all([empRes.json(), divRes.json(), depRes.json()]);

  const orgHierarchyData = structureClientHierarchy(divisions, departments);

  return (
    <EmployeesCSR
      initialRows={employees}
      orgHierarchyData={orgHierarchyData}
    />
  );
}
