import HomePage from "@/app/HomePageCSR";
// 1. Import the REAL UI types
import type { LeaveRequest } from "@/types/leaveRequest";
import type { EmployeeWithNames } from "@/types/employeeWithNames";
import type { Division } from "@/types/division";
import { Typography } from "@mui/material";

// 2. These functions will fetch from your Next.js API routes
async function getLeaveRequests(): Promise<LeaveRequest[]> {
  const res = await fetch(`${process.env.APP_ORIGIN}/api/leave-requests`, {
    cache: 'no-store' 
  });
  if (!res.ok) {
    throw new Error('Failed to fetch leave requests');
  }
  return res.json();
}

async function getEmployees(): Promise<EmployeeWithNames[]> {
  // Fetch 'with-names' to get joined data
  const res = await fetch(`${process.env.APP_ORIGIN}/api/employees/with-names`, { 
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('Failed to fetch employees');
  }
  return res.json();
}

async function getDivisions(): Promise<Division[]> {
  const res = await fetch(`${process.env.APP_ORIGIN}/api/divisions`, { 
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('Failed to fetch divisions');
  }
  return res.json();
}

export default async function Home() {
  try {
    // 3. Fetch all data in parallel
    const [leaveRequests, employees, divisions] = await Promise.all([
      getLeaveRequests(),
      getEmployees(),
      getDivisions()
    ]);

    // 4. Pass the clean, camelCase data to the client
    return (
      <HomePage 
        leaveRequests={leaveRequests} 
        employees={employees} 
        divisions={divisions}
      />
    );
  } catch (error) {
    console.error("Failed to load dashboard data:", error);
    // You can render an error state or fallback to mock data here
    return <Typography>Error loading dashboard.</Typography>;
  }
}