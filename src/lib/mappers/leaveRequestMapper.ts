import type { LeaveRequestDTO } from "@/types/leaveRequest.dto";
import type { LeaveRequest } from "@/types/leaveRequest";

const parseDate = (s: string) => new Date(s.replace(" ", "T"));

export function toLeaveRequest(dto: LeaveRequestDTO): LeaveRequest {
  return {
    requestID: dto.request_id,
    leaveType: dto.leave_type,
    startDate: parseDate(dto.start_date),
    endDate: parseDate(dto.end_date),
    reason: dto.reason,
    latestStatus: dto.latest_status,
    rejectReason: dto.reject_reason,
    isHalfDay: dto.is_half_day,
    isMorning: dto.is_morning,
    isFirstHalfDay: dto.is_first_half_day,
    isLastHalfDay: dto.is_last_half_day,
    latestTimestamp: parseDate(dto.latest_timestamp),

    employeeID: dto.employee_id,
    employeeProfile: dto.employee_profile,
    employeePosition: dto.employee_position,
    employeeFirstName: dto.employee_first_name,
    employeeLastName: dto.employee_last_name,
    employeeDivisionName: dto.employee_division_name,
    employeeDepartmentName: dto.employee_department_name,
  };
}

export const toLeaveRequests = (list: LeaveRequestDTO[]) => list.map(toLeaveRequest);
