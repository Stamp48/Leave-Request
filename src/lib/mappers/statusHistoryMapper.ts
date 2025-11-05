import type { StatusHistoryDTO } from "@/types/statusHistory.dto";
import type { StatusHistory } from "@/types/statusHistory";

const parseDate = (s: string) => new Date(s.replace(" ", "T"));

export function toStatusHistory(dto: StatusHistoryDTO): StatusHistory {
  return {
    requestID: dto.request_id,
    employeeID: dto.employee_id,
    status: dto.status,
    timestamp: parseDate(dto.timestamp),
  };
}

export const toStatusHistories = (list: StatusHistoryDTO[]) => list.map(toStatusHistory);
