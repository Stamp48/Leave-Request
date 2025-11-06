import type { StatusHistoryDTO } from "@/types/statusHistory.dto";
import type { StatusHistory } from "@/types/statusHistory";

function toDateSafe(v: unknown): Date {
  if (v instanceof Date) return v;
  if (typeof v === "string") {
    let s = v.trim();
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(s)) s = s.replace(" ", "T");
    if (!/[zZ]|[+\-]\d{2}:\d{2}$/.test(s)) s += "Z";
    const d = new Date(s);
    if (!isNaN(d.getTime())) return d;
  }
  return new Date();
}

export function toStatusHistory(dto: StatusHistoryDTO): StatusHistory {
  return {
    requestID: dto.request_id,
    employeeID: dto.employee_id,
    status: dto.status,
    timestamp: toDateSafe(dto.timestamp),
  };
}

export function toStatusHistories(list: unknown): StatusHistory[] {
  if (!Array.isArray(list)) return [];
  return (list as StatusHistoryDTO[]).map(toStatusHistory);
}
