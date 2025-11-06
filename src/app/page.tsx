// app/page.tsx (หรือ /app/(dashboard)/page.tsx ตามโครง)
import HomePage from "@/app/HomePageCSR";
import type { LeaveRequest } from "@/types/leaveRequest";
import type { EmployeeWithNames } from "@/types/employeeWithNames";
import type { Division } from "@/types/division";
import { Typography } from "@mui/material";

async function getLeaveRequests(): Promise<LeaveRequest[]> {
  const res = await fetch(`${process.env.APP_ORIGIN}/api/leave-requests`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch leave requests');
  return res.json();
}
async function getEmployees(): Promise<EmployeeWithNames[]> {
  const res = await fetch(`${process.env.APP_ORIGIN}/api/employees/with-names`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch employees');
  return res.json();
}
async function getDivisions(): Promise<Division[]> {
  const res = await fetch(`${process.env.APP_ORIGIN}/api/divisions`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch divisions');
  return res.json();
}

export default async function Home() {
  try {
    const [leaveRequests, employees, divisions] = await Promise.all([
      getLeaveRequests(),
      getEmployees(),
      getDivisions()
    ]);

    return (
      <HomePage 
        leaveRequests={leaveRequests} 
        employees={employees} 
        divisions={divisions}
      />
    );
  } catch (error) {
    console.error("Failed to load dashboard data:", error);
    return <Typography>Error loading dashboard.</Typography>;
  }
}
