import type { LeaveStatus } from "./leaveStatus";

export interface StatusHistory {
  requestID: number;
  employeeID: number;
  status: LeaveStatus;
  timestamp: Date;
}
