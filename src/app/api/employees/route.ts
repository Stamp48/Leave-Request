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
  // ✅ รับ multipart/form-data จาก client
  const form = await req.formData();

  // ✅ forward ไป Go ตรง ๆ แบบ multipart
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/employee`, {
    method: "POST",
    body: form,                     // Web FormData → multipart ให้อัตโนมัติ
    // ❌ ห้ามตั้ง Content-Type เอง
  });

  const text = await res.text();
  return new Response(text, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
  });
}