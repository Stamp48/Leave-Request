import HomePage from "@/app/HomePageCSR"
import { mockEmployees } from "./lib/mockDataEmp"
// FIXED: Import mockDivisions (the top-level) instead of mockDepartments
import { mockDivisions } from "./lib/mockDataDepDiv"
// FIXED: Import from the new snake_case file path
import { mockLeaveRequests } from "./lib/mockDataLeaveRequest"

async function getLeaveRequests() {
  const res = await fetch('http://localhost:8080/api/leave-requests', {
    cache: 'no-store' // ไม่ cache เพื่อให้ได้ข้อมูลล่าสุดเสมอ
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch leave requests')
  }
  
  return res.json()
}

async function getEmployees() {
  const res = await fetch('http://localhost:8080/api/employees', {
    cache: 'no-store'
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch employees')
  }
  
  return res.json()
}

// FIXED: Renamed function to get Divisions
async function getDivisions() {
  const res = await fetch('http://localhost:8080/api/divisions', {
    cache: 'no-store'
  })
  
  if (!res.ok) {
    // FIXED: Corrected error message
    throw new Error('Failed to fetch divisions')
  }
  
  return res.json()
}

export default async function Home() {
  // We'll keep the fetch logic, but as you requested,
  // we will pass the mock data to the component for now.
  
  // FIXED: Renamed variable to 'divisions'
  // const [leaveRequests, employees, divisions] = await Promise.all([
  //   getLeaveRequests(),
  //   getEmployees(),
  //   getDivisions()
  // ])
  // console.log([leaveRequests, employees, divisions])

  return (
    <HomePage 
      leaveRequests={mockLeaveRequests} 
      employees={mockEmployees} 
      // FIXED: Pass 'divisions' prop with mockDivisions
      divisions={mockDivisions}
    />
  )
}
