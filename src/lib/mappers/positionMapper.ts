import type { PositionDTO } from "@/types/position.dto";
import type { Position } from "@/types/position";

export function toPosition(dto: PositionDTO): Position {
  return {
    positionID: dto.position_id,
    positionName: dto.position_name,
  };
}

export const toPositions = (list: PositionDTO[]): Position[] => list.map(toPosition);
