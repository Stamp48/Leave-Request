// app/api/employee/[id]/route.ts
import { NextRequest } from "next/server";
import { toEmployeeWithNames } from "@/lib/mappers/employeeWithNamesMapper";
import { EmployeeWithNamesDTO } from "@/types/employeeWithNames.dto";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_ORIGIN || process.env.BACKEND_ORIGIN;

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params; // ✅ ต้อง await
  if (!BACKEND) {
    return new Response(JSON.stringify({ error: "BACKEND_ORIGIN is not set" }), { status: 500 });
  }

  const res = await fetch(`${BACKEND}/api/employee/${id}`);

  if (res.status === 404) return new Response("Employee not found", { status: 404 });
  if (!res.ok) {
    const text = await res.text();
    return new Response(`Backend error ${res.status}: ${text}`, { status: 502 });
  }

  const dto: EmployeeWithNamesDTO = await res.json();
  return Response.json(toEmployeeWithNames(dto), { status: 200 });
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params; // ✅ ต้อง await
  if (!BACKEND) {
    return new Response(JSON.stringify({ error: "BACKEND_ORIGIN is not set" }), { status: 500 });
  }

  const ct = req.headers.get("content-type") || "";
  let body: BodyInit | undefined;
  let headers: HeadersInit | undefined;

  if (ct.startsWith("multipart/form-data")) {
    const form = await req.formData();
    body = form; // ❗️อย่าตั้ง content-type เอง
  } else {
    const text = await req.text();
    body = text;
    headers = { "Content-Type": ct || "application/json" };
  }

  const resp = await fetch(`${BACKEND}/api/employee/${id}`, { method: "PUT", headers, body });

  // ✅ ถ้า backend ตอบ 204 ห้ามส่ง body กลับ
  if (resp.status === 204) {
    return new Response(null, { status: 204 });
  }

  // อย่างอื่น proxy ตาม content-type เดิม
  const respCT = resp.headers.get("content-type") || "application/json";
  const respText = await resp.text();
  return new Response(respText, { status: resp.status, headers: { "Content-Type": respCT } });
}
