import type { LeaveStatus } from "./leaveStatus";

export interface LeaveRequest {
  requestID: number;
  leaveType: string;
  startDate: Date;
  endDate: Date;
  reason: string | null;
  latestStatus: LeaveStatus;
  rejectReason: string | null;
  isHalfDay: boolean | null;
  isMorning: boolean | null;
  isFirstHalfDay: boolean | null;
  isLastHalfDay: boolean | null;
  latestTimestamp: Date;

  employeeID: number;
  employeeProfile: string;
  employeePosition: string;
  employeeFirstName: string;
  employeeLastName: string;
  employeeDivisionName: string;
  employeeDepartmentName: string;
}
