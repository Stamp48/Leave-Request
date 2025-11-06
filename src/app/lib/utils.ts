// utils.ts
import { startOfDay } from "date-fns";
import type { LeaveRequest } from "@/types/leaveRequest";

function toDate(value: unknown): Date {
  if (value instanceof Date) return value;
  if (typeof value === "number") return new Date(value);
  if (typeof value === "string") {
    // รองรับรูปแบบ "YYYY-MM-DD" และ "YYYY-MM-DD HH:MM:SS"
    const s = value.includes("T") ? value : value.replace(" ", "T");
    const d = new Date(s);
    if (!isNaN(d.getTime())) return d;
  }
  // fallback: วันนี้ (อย่างน้อยไม่ให้พัง)
  return new Date();
}

/**
 * คำนวณวันลาเป็นวันทำการ (รองรับ half-day/first/last-half)
 */
export function calculateLeaveDuration(request: LeaveRequest): number {
  // ✅ บังคับให้เป็น Date จริงก่อนเสมอ
  const start = startOfDay(toDate(request.startDate));
  const end   = startOfDay(toDate(request.endDate));

  // --- 1) single-day ---
  if (start.getTime() === end.getTime()) {
    const dow = start.getDay(); // 0=Sun, 6=Sat
    if (dow === 0 || dow === 6) return 0;
    return request.isHalfDay ? 0.5 : 1;
  }

  // --- 2) multi-day ---
  let total = 0;
  const cur = new Date(start); // ไม่แก้ start ต้นฉบับ

  while (cur <= end) {
    const dow = cur.getDay();
    if (dow !== 0 && dow !== 6) {
      const isFirst = cur.getTime() === start.getTime();
      const isLast  = cur.getTime() === end.getTime();

      if (isFirst && request.isFirstHalfDay) total += 0.5;
      else if (isLast && request.isLastHalfDay) total += 0.5;
      else total += 1;
    }
    cur.setDate(cur.getDate() + 1);
  }

  return total;
}

/**
 * filter Requests by DateRange (รองรับ string/Date)
 */
export function filterRequestsByRange(
  requests: LeaveRequest[],
  dateRange: { from?: Date; to?: Date } | undefined
): LeaveRequest[] {
  if (!dateRange || !dateRange.from) return requests;

  const filterStart = startOfDay(toDate(dateRange.from as any));
  const filterEnd   = dateRange.to ? startOfDay(toDate(dateRange.to as any)) : filterStart;

  return requests.filter((req) => {
    const reqStart = startOfDay(toDate(req.startDate));
    const reqEnd   = startOfDay(toDate(req.endDate));
    // overlap: (reqEnd >= filterStart) && (reqStart <= filterEnd)
    return reqEnd >= filterStart && reqStart <= filterEnd;
  });
}
