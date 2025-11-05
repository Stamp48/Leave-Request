import type { DivisionDTO } from "@/types/division.dto";
import type { Division } from "@/types/division";

export function toDivision(dto: DivisionDTO): Division {
  return {
    divisionID: dto.division_id,
    divisionName: dto.division_name,
  };
}

export const toDivisions = (list: DivisionDTO[]) => list.map(toDivision);
