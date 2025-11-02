import HomePage from "@/app/HomePageCSR"
import { mockEmployees } from "./lib/mockDataEmp"
import { mockDepartments } from "./lib/mockDataDepDiv"
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

async function getDepartments() {
  const res = await fetch('http://localhost:8080/api/divisions', {
    cache: 'no-store'
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch departments')
  }
  
  return res.json()
}

export default async function Home() {
  // ดึงข้อมูลจาก backend แบบ parallel
  const [leaveRequests, employees, departments] = await Promise.all([
    getLeaveRequests(),
    getEmployees(),
    getDepartments()
  ])

  console.log([leaveRequests, employees, departments])

  return (
    <HomePage 
      leaveRequests={mockLeaveRequests} 
      employees={mockEmployees} 
      departments={mockDepartments}
    />
  )
}