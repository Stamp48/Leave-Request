import { toEmployees } from "@/lib/mappers/employeeMapper";
import type { EmployeeDTO } from "@/types/employee.dto";
import type { Employee } from "@/types/employee"
import { NextRequest } from "next/server";


export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/employees`, {
    cache: "no-store",
  });
  const dto: EmployeeDTO[] = await res.json();
  const ui: Employee[] = toEmployees(dto);
  return Response.json(ui, { status: res.status });
}

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/employee`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  // passthrough response
  const text = await res.text();
  return new Response(text, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
  });
}