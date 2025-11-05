import type { LeaveStatus } from "./leaveStatus";

export interface LeaveRequestDTO {
  request_id: number;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string | null;
  latest_status: LeaveStatus;
  reject_reason: string | null;
  is_half_day: boolean | null;
  is_morning: boolean | null;
  is_first_half_day: boolean | null;
  is_last_half_day: boolean | null;
  latest_timestamp: string;

  employee_id: number;
  employee_profile: string;
  employee_position: string;
  employee_first_name: string;
  employee_last_name: string;
  employee_division_name: string;
  employee_department_name: string;
}