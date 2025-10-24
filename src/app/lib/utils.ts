// src/app/lib/utils.ts

import { DepartmentType, DivisionType } from "./mockDataDepDiv";
import { EmployeeType } from "./mockDataEmp";
import { LeaveRequestType } from "./mockDataLeaveRequest";
import { parseISO, startOfDay } from "date-fns";
import { DateRange } from "react-day-picker";

// Define a type for our final structured object for clarity
export type DepartmentDataForClient = Record<string, string[]>;

export function structureDataForClient(
    departments: DepartmentType[],
    divisions: DivisionType[]
): DepartmentDataForClient {
    return departments.reduce((acc, department) => {
        const relevantDivisions = divisions
            .filter(div => div.departmentId === department.departmentId)
            .map(div => div.divisionName);

        acc[department.departmentName] = relevantDivisions;
        return acc;
    }, {} as DepartmentDataForClient); // Using our defined type here
}


export function getDepartmentName(departmentId: number, departments: DepartmentType[]): string {
    const department = departments.find((dept) => dept.departmentId === departmentId);
    return department ? department.departmentName : "Unknown Department";
}

export const getSupervisorsByDepartment = (employeeList: EmployeeType[], department: string): EmployeeType[] => {
    const supervisorIds = new Set(
        employeeList
            .map(emp => emp.supervisorId)
            .filter((id): id is number => id != null) // Type guard to ensure we only have numbers
    );

    return employeeList.filter(emp =>
        supervisorIds.has(emp.id) && emp.department === department
    );
};

export const getDirectReports = (employeeList: EmployeeType[], supervisorId: number): EmployeeType[] => {
    return employeeList.filter(emp => emp.supervisorId === supervisorId);
};

export const countEmployeesByDepartment = (employeeList: EmployeeType[]): Record<string, number> => {
    return employeeList.reduce((acc: Record<string, number>, emp) => {
        acc[emp.department] = (acc[emp.department] || 0) + 1;
        return acc;
    }, {});
};

export const getTopLevelEmployees = (employeeList: EmployeeType[]): EmployeeType[] => {
    return employeeList.filter(emp => emp.supervisorId == null);
};

export const getReportingChain = (employeeList: EmployeeType[], employeeId: number): EmployeeType[] => {
    const chain: EmployeeType[] = [];
    const employeeMap = new Map(employeeList.map(emp => [emp.id, emp]));

    let currentEmployee = employeeMap.get(employeeId);

    while (currentEmployee?.supervisorId) {
        const supervisor = employeeMap.get(currentEmployee.supervisorId);
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
 * - Single-day half-day requests (using `isHalfDay`)
 * - Multi-day requests with half-days on the first or last day
 */
export function calculateLeaveDuration(request: LeaveRequestType): number {
  const startDate = parseLocalDate(request.startDate);
  const endDate = parseLocalDate(request.endDate);

  // --- 1. Handle single-day requests ---
  if (startDate.getTime() === endDate.getTime()) {
    const dayOfWeek = startDate.getDay();
    // Check if the single day is a weekend
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return 0;
    }
    // It's a weekday
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

      if (isFirstDay && request.isFirstHalfDay) {
        totalDays += 0.5;
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
  requests: LeaveRequestType[], 
  dateRange: DateRange | undefined
): LeaveRequestType[] {

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
    const reqStart = parseISO(req.startDate);
    const reqEnd = parseISO(req.endDate);

    // The logic for an overlap:
    // Request ends after filter starts AND Request starts before filter ends
    const isOverlapping = 
      (reqEnd >= filterStart) && (reqStart <= filterEnd);
    
    return isOverlapping;
  });
}

