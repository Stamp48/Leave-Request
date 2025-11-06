// ✅ app/api/attachment/leave-requests/[id]/route.ts
import type { NextRequest } from "next/server";
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_ORIGIN || process.env.BACKEND_ORIGIN;

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const r = await fetch(`${BACKEND}/api/attachment/leave-requests/${params.id}`, { cache: "no-store" });
  if (r.status === 404) return Response.json([], { status: 200 });
  const txt = await r.text();
  return new Response(txt, { status: r.status, headers: { "content-type": r.headers.get("content-type") || "application/json" } });
}
