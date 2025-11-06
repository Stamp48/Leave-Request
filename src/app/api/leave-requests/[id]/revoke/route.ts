// app/api/leave-requests/[id]/revoke/route.ts
import { NextRequest } from "next/server";
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_ORIGIN || process.env.BACKEND_ORIGIN;

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!BACKEND) return new Response(JSON.stringify({ error: "BACKEND_ORIGIN is not set" }), { status: 500 });
  const { id } = await ctx.params;

  const { reason } = await req.json().catch(() => ({ reason: "" }));
  const payload = { action: "REVOKE", reason }; // ✅ ให้ Go เปลี่ยนสถานะ + บันทึกเหตุผล

  const r = await fetch(`${BACKEND}/api/leaveRequestHR/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (r.status === 204) return new Response(null, { status: 204 });
  const ct = r.headers.get("content-type") || "application/json";
  const txt = await r.text();
  return new Response(txt, { status: r.status, headers: { "Content-Type": ct } });
}
