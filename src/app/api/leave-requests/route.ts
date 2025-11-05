import { toLeaveRequests } from "@/lib/mappers/leaveRequestMapper";
import type { LeaveRequestDTO } from "@/types/leaveRequest.dto";

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/leaveRequestsHR`);
  const dto: LeaveRequestDTO[] = await res.json();
  return Response.json(toLeaveRequests(dto));
}
