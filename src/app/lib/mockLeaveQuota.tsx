/**
 * Defines the structure for an employee's leave quota for a
 * specific leave type in a specific year, based on the ERD.
 */
export interface LeaveQuotaType {
  /** Links to EmployeeType.employee_id */
  employee_id: number;
  
  /** The calendar year this quota applies to */
  year: number;
  
  /** The name of the leave type (e.g., 'Annual', 'Sick') */
  leave_type: string; 
  
  /** The total number of days allotted for this type/year */
  total_days: number;
  
  /** * The number of days used against this quota.
   * This can be a float to account for half-days (e.g., 2.5).
   */
  used_days: number;
}

/**
 * Mock data for employee leave quotas for 2025.
 * * Standard allotments are:
 * - Annual: 15 days
 * - Sick: 30 days
 * - Personal: 5 days
 * - Bereavement: 5 days
 * - Paternity: 10 days
 * * 'used_days' is pre-calculated based on *Approved* requests
 * in mockLeaveRequests.ts for the year 2025.
 */
export const mockLeaveQuotas: LeaveQuotaType[] = [
  // --- Alice (id: 1) ---
  { employee_id: 1, year: 2025, leave_type: 'Annual', total_days: 15, used_days: 0 },
  { employee_id: 1, year: 2025, leave_type: 'Sick', total_days: 30, used_days: 0 },
  { employee_id: 1, year: 2025, leave_type: 'Personal', total_days: 5, used_days: 0 },

  // --- Bob (id: 2) --- (Req 15 is Pending)
  { employee_id: 2, year: 2025, leave_type: 'Annual', total_days: 15, used_days: 0 },
  { employee_id: 2, year: 2025, leave_type: 'Sick', total_days: 30, used_days: 0 },
  { employee_id: 2, year: 2025, leave_type: 'Personal', total_days: 5, used_days: 0 },

  // --- Charlie (id: 3) ---
  // Used: Req 13 (Annual, 3 days, last half-day) = 2.5 days
  // Used: Req 4 (Personal, 1 day, half-day) = 0.5 days
  { employee_id: 3, year: 2025, leave_type: 'Annual', total_days: 15, used_days: 2.5 }, 
  { employee_id: 3, year: 2025, leave_type: 'Sick', total_days: 30, used_days: 0 },
  { employee_id: 3, year: 2025, leave_type: 'Personal', total_days: 5, used_days: 0.5 },

  // --- David (id: 4) --- (Req 12 is Rejected)
  { employee_id: 4, year: 2025, leave_type: 'Annual', total_days: 15, used_days: 0 },
  { employee_id: 4, year: 2025, leave_type: 'Sick', total_days: 30, used_days: 0 },
  { employee_id: 4, year: 2025, leave_type: 'Personal', total_days: 5, used_days: 0 },

  // --- Eva (id: 5) ---
  { employee_id: 5, year: 2025, leave_type: 'Annual', total_days: 15, used_days: 0 },
  { employee_id: 5, year: 2025, leave_type: 'Sick', total_days: 30, used_days: 0 },
  { employee_id: 5, year: 2025, leave_type: 'Personal', total_days: 5, used_days: 0 },

  // --- Frank (id: 6) ---
  { employee_id: 6, year: 2025, leave_type: 'Annual', total_days: 15, used_days: 0 },
  { employee_id: 6, year: 2025, leave_type: 'Sick', total_days: 30, used_days: 0 },
  { employee_id: 6, year: 2025, leave_type: 'Personal', total_days: 5, used_days: 0 },

  // --- Grace (id: 7) ---
  { employee_id: 7, year: 2025, leave_type: 'Annual', total_days: 15, used_days: 0 },
  { employee_id: 7, year: 2025, leave_type: 'Sick', total_days: 30, used_days: 0 },
  { employee_id: 7, year: 2025, leave_type: 'Personal', total_days: 5, used_days: 0 },

  // --- Hannah (id: 8) ---
  { employee_id: 8, year: 2025, leave_type: 'Annual', total_days: 15, used_days: 0 },
  { employee_id: 8, year: 2025, leave_type: 'Sick', total_days: 30, used_days: 0 },
  { employee_id: 8, year: 2025, leave_type: 'Personal', total_days: 5, used_days: 0 },

  // --- Ian (id: 9) ---
  { employee_id: 9, year: 2025, leave_type: 'Annual', total_days: 15, used_days: 0 },
  { employee_id: 9, year: 2025, leave_type: 'Sick', total_days: 30, used_days: 0 },
  { employee_id: 9, year: 2025, leave_type: 'Personal', total_days: 5, used_days: 0 },

  // --- Jack (id: 10) ---
  // Used: Req 11 (Personal, 3 days, first half-day) = 2.5 days
  { employee_id: 10, year: 2025, leave_type: 'Annual', total_days: 15, used_days: 0 },
  { employee_id: 10, year: 2025, leave_type: 'Sick', total_days: 30, used_days: 0 },
  { employee_id: 10, year: 2025, leave_type: 'Personal', total_days: 5, used_days: 2.5 },

  // --- Karen (id: 11) --- (Req 3 is Pending)
  // Used: Req 7 (Annual, 5 days) = 5 days
  { employee_id: 11, year: 2025, leave_type: 'Annual', total_days: 15, used_days: 5 },
  { employee_id: 11, year: 2025, leave_type: 'Sick', total_days: 30, used_days: 0 },
  { employee_id: 11, year: 2025, leave_type: 'Personal', total_days: 5, used_days: 0 },

  // --- Leo (id: 12) --- (Req 5 is Pending)
  // Used: Req 1 (Annual, 5 days) + Req 10 (Annual, 5 days) = 10 days
  { employee_id: 12, year: 2025, leave_type: 'Annual', total_days: 15, used_days: 10 },
  { employee_id: 12, year: 2025, leave_type: 'Sick', total_days: 30, used_days: 0 },
  { employee_id: 12, year: 2025, leave_type: 'Personal', total_days: 5, used_days: 0 },

  // --- Mona (id: 13) --- (Req 9 is Pending)
  { employee_id: 13, year: 2025, leave_type: 'Annual', total_days: 15, used_days: 0 },
  { employee_id: 13, year: 2025, leave_type: 'Sick', total_days: 30, used_days: 0 },
  { employee_id: 13, year: 2025, leave_type: 'Personal', total_days: 5, used_days: 0 },

  // --- Nina (id: 14) --- (Req 6 is Rejected)
  { employee_id: 14, year: 2025, leave_type: 'Annual', total_days: 15, used_days: 0 },
  { employee_id: 14, year: 2025, leave_type: 'Sick', total_days: 30, used_days: 0 },
  { employee_id: 14, year: 2025, leave_type: 'Personal', total_days: 5, used_days: 0 },

  // --- Oscar (id: 15) ---
  // Used: Req 2 (Sick, 1 day) = 1 day
  // Used: Req 8 (Bereavement, 3 days) = 3 days
  // Used: Req 14 (Paternity, 5 days) = 5 days
  { employee_id: 15, year: 2025, leave_type: 'Annual', total_days: 15, used_days: 0 },
  { employee_id: 15, year: 2025, leave_type: 'Sick', total_days: 30, used_days: 1 },
  { employee_id: 15, year: 2025, leave_type: 'Personal', total_days: 5, used_days: 0 },
  { employee_id: 15, year: 2025, leave_type: 'Bereavement', total_days: 5, used_days: 3 },
  { employee_id: 15, year: 2025, leave_type: 'Paternity', total_days: 10, used_days: 5 },
];