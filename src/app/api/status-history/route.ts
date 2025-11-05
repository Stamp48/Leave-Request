import { toStatusHistories } from "@/lib/mappers/statusHistoryMapper";
import type { StatusHistoryDTO } from "@/types/statusHistory.dto";

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/statusHistoryHR`);
  const dto: StatusHistoryDTO[] = await res.json();
  return Response.json(toStatusHistories(dto));
}
