// CHANGED: Correctly import both types
import { Division } from "@/types/division";
// CHANGED: Updated import path
import { parseISO, startOfDay } from "date-fns";
import { DateRange } from "react-day-picker";
import { Department } from "@/types/department";
import { EmployeeWithNames } from "@/types/employeeWithNames";
import { LeaveRequest } from "@/types/leaveRequest";

// CHANGED: Renamed type for clarity. It maps Divisions to Departments.
export type ClientHierarchyData = Record<string, string[]>;

// CHANGED: Function renamed and logic inverted to match Div > Dept hierarchy
export function structureClientHierarchy(
  divisions: Division[],
  departments: Department[]
): ClientHierarchyData {
  return divisions.reduce((acc, division) => {
    // Find departments belonging to this division
    const relevantDepartments = departments
      .filter(dept => dept.divisionID === division.divisionID)
      .map(dept => dept.departmentName);
    acc[division.divisionName] = relevantDepartments;
    return acc;
  }, {} as ClientHierarchyData);
}

// CHANGED: Corrected the type of the 'departments' parameter
export function getDepartmentName(departmentId: number, departments: Department[]): string {
  const department = departments.find((dept) => dept.departmentID === departmentId);
  return department ? department.departmentName: "Unknown Department";
}

// CHANGED: Renamed function and updated filter logic to use 'division'
export const getSupervisorsByDivision = (employeeList: EmployeeWithNames[], division: string): EmployeeWithNames[] => {
  const supervisorIds = new Set(
    employeeList
      .map(emp => emp.supervisorID)
      .filter((id): id is number => id != null) // Type guard
  );
  return employeeList.filter(emp =>
    supervisorIds.has(emp.employeeID) && emp.divisionName === division // CHANGED: was emp.department
  );
};

export const getDirectReports = (employeeList: EmployeeWithNames[], supervisorId: number): EmployeeWithNames[] => {
  return employeeList.filter(emp => emp.supervisorID === supervisorId);
};

// CHANGED: Renamed function and updated reducer logic to use 'division'
export const countEmployeesByDivision = (employeeList: EmployeeWithNames[]): Record<string, number> => {
  return employeeList.reduce((acc: Record<string, number>, emp) => {
    acc[emp.divisionName] = (acc[emp.divisionName] || 0) + 1; // CHANGED: was emp.department
    return acc;
  }, {});
};

export const getTopLevelEmployees = (employeeList: EmployeeWithNames[]): EmployeeWithNames[] => {
  return employeeList.filter(emp => emp.supervisorID == null);
};

export const getReportingChain = (employeeList: EmployeeWithNames[], employeeId: number): EmployeeWithNames[] => {
  const chain: EmployeeWithNames[] = [];
  const employeeMap = new Map(employeeList.map(emp => [emp.employeeID, emp]));
  let currentEmployee = employeeMap.get(employeeId);
  while (currentEmployee?.supervisorID) {
    const supervisor = employeeMap.get(currentEmployee.supervisorID);
    if (supervisor) {
      chain.push(supervisor);
      currentEmployee = supervisor;
    } else {
      break; // Stop if a supervisor ID points to a non-existent employee
    }
  }
  return chain;
};

function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  // Month is 0-indexed in JavaScript (0 = January, 11 = December)
  return new Date(year, month - 1, day);
}

/**
 * Calculates the total duration of a leave request in business days.
 * This function correctly handles:
 * - Weekends (Saturday/Sunday)
 * - Single-day full-day requests
 * - Single-day half-day requests (using `is_half_day`)
 * - Multi-day requests with half-days on the first or last day
 * * UPDATED: to use snake_case properties (is_half_day, etc.)
 */
export function calculateLeaveDuration(request: LeaveRequest): number {
  const startDate = request.startDate;
  const endDate = request.endDate;

  // --- 1. Handle single-day requests ---
  if (startDate.getTime() === endDate.getTime()) {
    const dayOfWeek = startDate.getDay();
    // Check if the single day is a weekend
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return 0;
    }
    // It's a weekday
    // FIXED: Use snake_case
    return request.isHalfDay ? 0.5 : 1;
  }

  // --- 2. Handle multi-day requests ---
  let totalDays = 0;
  // Create a new Date object to loop with, so we don't modify the original
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();

    // Check if the current day is a weekday (1=Mon, 2=Tue, ..., 5=Fri)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const isFirstDay = currentDate.getTime() === startDate.getTime();
      const isLastDay = currentDate.getTime() === endDate.getTime();

      // FIXED: Use snake_case
      if (isFirstDay && request.isFirstHalfDay) {
        totalDays += 0.5;
      // FIXED: Use snake_case
      } else if (isLastDay && request.isLastHalfDay) { 
        totalDays += 0.5;
      } else {
        // It's a full workday
        totalDays += 1;
      }
    }
    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return totalDays;
}

export function filterRequestsByRange(
  requests: LeaveRequest[],
  dateRange: DateRange | undefined
): LeaveRequest[] {
  // If no range is selected, return all requests.
  if (!dateRange || !dateRange.from) {
    return requests;
  }
  // Use startOfDay to ignore time and prevent timezone/comparison issues
  const filterStart = startOfDay(dateRange.from);
  // Handle case where only a "from" date is selected
  const filterEnd = dateRange.to ? startOfDay(dateRange.to) : filterStart;

  return requests.filter(req => {
    // parseISO correctly handles 'YYYY-MM-DD' strings
    const reqStart = req.startDate;
    const reqEnd = req.endDate;
    // The logic for an overlap:
    // Request ends after filter starts AND Request starts before filter ends
    const isOverlapping =
      (reqEnd >= filterStart) && (reqStart <= filterEnd);
    return isOverlapping;
  });
}
