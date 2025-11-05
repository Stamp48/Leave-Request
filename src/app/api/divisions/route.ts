import { toDivisions } from "@/lib/mappers/divisionMapper";
import type { DivisionDTO } from "@/types/division.dto";

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/divisionsHR`);
  const dto: DivisionDTO[] = await res.json();
  return Response.json(toDivisions(dto));
}
