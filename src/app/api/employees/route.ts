import { toEmployees } from "@/lib/mappers/employeeMapper";
import type { EmployeeDTO } from "@/types/employee.dto";
import type { Employee } from "@/types/employee"

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/employees`, {
    cache: "no-store",
  });
  const dto: EmployeeDTO[] = await res.json();
  const ui: Employee[] = toEmployees(dto);
  return Response.json(ui, { status: res.status });
}