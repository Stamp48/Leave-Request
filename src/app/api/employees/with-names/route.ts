import { EmployeeWithNamesDTO } from "@/types/employeeWithNames.dto";
import { EmployeeWithNames } from "@/types/employeeWithNames";
import { toEmployeesWithNames } from "@/lib/mappers/employeeWithNamesMapper";

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/employees/with-names`, {
    cache: "no-store",
  });
  const dto: EmployeeWithNamesDTO[] = await res.json();
  const ui: EmployeeWithNames[] = toEmployeesWithNames(dto);
  return Response.json(ui, { status: res.status });
}