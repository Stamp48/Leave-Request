import type { LeaveStatus } from "./leaveStatus";

export interface StatusHistoryDTO {
  request_id: number;
  employee_id: number;
  status: LeaveStatus;
  timestamp: string;
}