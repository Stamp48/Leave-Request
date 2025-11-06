// ✅ app/api/status-history/[id]/route.ts
import type { NextRequest } from "next/server";
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_ORIGIN || process.env.BACKEND_ORIGIN;

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const r = await fetch(`${BACKEND}/api/statusHistoryHR/${params.id}`, { cache: "no-store" });
  if (!r.ok) return new Response("[]", { status: 200 });
  const txt = await r.text();
  return new Response(txt, { status: 200, headers: { "content-type": "application/json" } });
}
