import { toLeaveRequest } from "@/lib/mappers/leaveRequestMapper";
import type { LeaveRequestDTO } from "@/types/leaveRequest.dto";
import type { NextRequest } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/leaveRequestHR/${params.id}`);

  if (!res.ok) return new Response("Not found", { status: 404 });

  const dto: LeaveRequestDTO = await res.json();
  return Response.json(toLeaveRequest(dto));
}
