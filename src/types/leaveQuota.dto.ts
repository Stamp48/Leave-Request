export interface LeaveQuotaDTO {
  employee_id: number;
  year: number;
  leave_type: string; 
  total_days: number;
  used_days: number;
}