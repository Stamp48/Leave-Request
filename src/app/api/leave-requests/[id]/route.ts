import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // FIXED: Await params before accessing properties
  const { id } = await params;
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/leaveRequestHR/${id}`
  );

  if (!res.ok) return new Response("Not found", { status: 404 });

  const data = await res.json();
  return Response.json(data);
}