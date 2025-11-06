// app/employees/[id]/edit/page.tsx
import EditEmployee from "./EditEmployeeCSR";
import { EmployeeWithNames } from "@/types/employeeWithNames";
import { Division } from "@/types/division";
import { Department } from "@/types/department";
import { Position } from "@/types/position";
import { structureClientHierarchy } from "@/app/lib/utils"; // ✅ ใช้อันที่มีอยู่แล้ว

export default async function EditEmployeePage({ params }: { params: { id: string } }) {
  const id = params.id;

  const [empRes, listRes, divRes, depRes, posRes] = await Promise.all([
    fetch(`${process.env.APP_ORIGIN}/api/employee/${id}`, { cache: "no-store" }),
    fetch(`${process.env.APP_ORIGIN}/api/employees/with-names`, { cache: "no-store" }),
    fetch(`${process.env.APP_ORIGIN}/api/divisions`, { cache: "no-store" }),
    fetch(`${process.env.APP_ORIGIN}/api/departments`, { cache: "no-store" }),
    fetch(`${process.env.APP_ORIGIN}/api/positions`, { cache: "no-store" }),
  ]);

  if (!empRes.ok) throw new Error("Failed to fetch employee by ID");
  if (!listRes.ok) throw new Error("Failed to fetch employees");
  if (!divRes.ok) throw new Error("Failed to fetch divisions");
  if (!depRes.ok) throw new Error("Failed to fetch departments");
  if (!posRes.ok) throw new Error("Failed to fetch positions");

  const [
    employee,
    employees,
    divisions,
    departments,
    positions,
  ]: [
    EmployeeWithNames,
    EmployeeWithNames[],
    Division[],
    Department[],
    Position[]
  ] = await Promise.all([
    empRes.json(),
    listRes.json(),
    divRes.json(),
    depRes.json(),
    posRes.json(),
  ]);

  if (!employee) return <h1>Employee not found</h1>;

  const supervisor = employee.supervisorID
    ? employees.find(e => e.employeeID === employee.supervisorID)
    : undefined;

  const isSupervisor = employees.some(e => e.supervisorID === employee.employeeID);

  const orgHierarchyData = structureClientHierarchy(divisions, departments);

  return (
    <EditEmployee
      employee={employee}
      supervisor={supervisor}
      isSupervisor={isSupervisor}
      orgHierarchyData={orgHierarchyData}
      allEmployees={employees}
      allPositions={positions}
    />
  );
}
