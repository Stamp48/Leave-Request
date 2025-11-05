import { toLeaveQuotas } from "@/lib/mappers/leaveQuotaMapper";
import type { LeaveQuotaDTO } from "@/types/leaveQuota.dto";
import type { NextRequest } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: { employeeID: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/leaveQuotaHR/${params.employeeID}`);
  const dto: LeaveQuotaDTO[] = await res.json();

  return Response.json(toLeaveQuotas(dto));
}
