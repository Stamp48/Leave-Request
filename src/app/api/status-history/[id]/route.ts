import { toStatusHistories } from "@/lib/mappers/statusHistoryMapper";
import type { StatusHistoryDTO } from "@/types/statusHistory.dto";
import type { NextRequest } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: { requestID: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/statusHistoryHR/${params.requestID}`);
  const dto: StatusHistoryDTO[] = await res.json();

  return Response.json(toStatusHistories(dto));
}
