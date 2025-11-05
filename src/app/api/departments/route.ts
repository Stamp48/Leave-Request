import { toDepartments } from "@/lib/mappers/departmentMapper";
import type { DepartmentDTO } from "@/types/department.dto";

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/departmentsHR`);
  const dto: DepartmentDTO[] = await res.json();
  return Response.json(toDepartments(dto));
}
