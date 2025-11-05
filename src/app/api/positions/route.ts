import { toPositions } from "@/lib/mappers/positionMapper";
import type { PositionDTO } from "@/types/position.dto";

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/positionsHR`);
  const dto: PositionDTO[] = await res.json();
  return Response.json(toPositions(dto));
}
