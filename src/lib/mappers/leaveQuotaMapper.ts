import type { LeaveQuotaDTO } from "@/types/leaveQuota.dto";
import type { LeaveQuota } from "@/types/leaveQuota";

export function toLeaveQuota(dto: LeaveQuotaDTO): LeaveQuota {
  return {
    employeeID: dto.employee_id,
    year: dto.year,
    leaveType: dto.leave_type,
    totalDays: dto.total_days,
    usedDays: dto.used_days,
  };
}

export const toLeaveQuotas = (list: LeaveQuotaDTO[]) => list.map(toLeaveQuota);
