import { parseISO, startOfDay } from "date-fns";
import { DateRange } from "react-day-picker";
import { LeaveRequest } from "@/types/leaveRequest";

/** รองรับ input เป็น Date หรือ 'YYYY-MM-DD' string */
function asDayDate(v: Date | string | undefined | null, fieldName: string): Date {
  if (v instanceof Date) return startOfDay(v);
  if (typeof v === "string" && v.trim() !== "") {
    const d = startOfDay(parseISO(v));
    if (!isNaN(d.getTime())) return d;
  }
  throw new TypeError(`Invalid or missing date: ${fieldName}`);
}

/** อ่าน boolean โดยรองรับทั้ง camelCase/snake_case */
function readBool(
  obj: Record<string, any>,
  camel: string,
  snake: string,
  defaultValue = false
): boolean {
  if (camel in obj && typeof obj[camel] === "boolean") return obj[camel] as boolean;
  if (snake in obj && typeof obj[snake] === "boolean") return obj[snake] as boolean;
  return defaultValue;
}

/**
 * คำนวณจำนวนวันลา (นับเฉพาะวันทำงาน) รองรับ:
 * - single-day (full/half)
 * - multi-day (half เฉพาะวันแรก/วันท้าย)
 * - input เป็น string หรือ Date
 * - ชื่อฟิลด์ทั้ง camelCase/snake_case
 */
export function calculateLeaveDuration(request: LeaveRequest): number {
  const startDate = asDayDate((request as any).startDate ?? (request as any).start_date, "startDate");
  const endDate   = asDayDate((request as any).endDate   ?? (request as any).end_date,   "endDate");

  const isHalfDay      = readBool(request as any, "isHalfDay", "is_half_day");
  const isFirstHalfDay = readBool(request as any, "isFirstHalfDay", "is_first_half_day");
  const isLastHalfDay  = readBool(request as any, "isLastHalfDay", "is_last_half_day");

  // --- single-day ---
  if (startDate.getTime() === endDate.getTime()) {
    const dow = startDate.getDay();
    if (dow === 0 || dow === 6) return 0;   // เสาร์/อาทิตย์
    return isHalfDay ? 0.5 : 1;
  }

  // --- multi-day ---
  let total = 0;
  const cur = new Date(startDate);
  while (cur <= endDate) {
    const dow = cur.getDay();
    if (dow !== 0 && dow !== 6) {
      const first = cur.getTime() === startDate.getTime();
      const last  = cur.getTime() === endDate.getTime();
      if (first && isFirstHalfDay) total += 0.5;
      else if (last && isLastHalfDay) total += 0.5;
      else total += 1;
    }
    cur.setDate(cur.getDate() + 1);
  }
  return total;
}

/** filter ตามช่วงวันที่ โดย normalize เป็น start-of-day ทั้งหมด */
export function filterRequestsByRange(
  requests: LeaveRequest[],
  dateRange: DateRange | undefined
): LeaveRequest[] {
  if (!dateRange || !dateRange.from) return requests;

  const filterStart = startOfDay(dateRange.from);
  const filterEnd   = startOfDay(dateRange.to ?? dateRange.from);

  return requests.filter((req) => {
    const reqStart = asDayDate((req as any).startDate ?? (req as any).start_date, "startDate");
    const reqEnd   = asDayDate((req as any).endDate   ?? (req as any).end_date,   "endDate");
    // ซ้อนทับกันถ้า reqEnd >= filterStart และ reqStart <= filterEnd
    return reqEnd >= filterStart && reqStart <= filterEnd;
  });
}
