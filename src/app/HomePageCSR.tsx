"use client"

import * as React from "react"
import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import DashCard from "./components/DashComp/DashCard"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { ChartBarHorizontal } from "@/components/chart-bar-horizontal"
import { ChartPieDonutText } from "@/components/chart-pie-donut-text"
import { ChartPieLabel } from "@/components/chart-pie-label"

// --- Import your mock data and chart types ---
import type { ChartConfig } from "@/components/ui/chart"
import { LeaveRequestType } from "./lib/mockDataLeaveRequest"
import { EmployeeType } from "./lib/mockDataEmp"
import { DivisionType } from "./lib/mockDataDepDiv"

// This config is for the Area Chart
const totalChartConfig = {
  total: {
    label: "Total Requests",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

// --- Define colors for the Pie Charts ---
const DEPARTMENT_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

export default function HomePage({ leaveRequests, employees, departments }: { leaveRequests: LeaveRequestType[], employees: EmployeeType[], departments: DivisionType[] }) {
  const [timeRange, setTimeRange] = React.useState("7d")

  // --- Map for quick employee department lookups ---
  const employeeDeptMap = React.useMemo(() => {
    return new Map(employees.map(emp => [emp.employee_id, emp.department]))
  }, [employees])

  // --- Single, time-filtered list of requests ---
  const filteredRequests = React.useMemo(() => {
    const referenceDate = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }

    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    startDate.setHours(0, 0, 0, 0)

    return leaveRequests.filter(req => {
      const reqDate = new Date(req.start_date)
      return reqDate >= startDate
    })
  }, [leaveRequests, timeRange])

  // --- Calculate dashboard totals ---
  const dashboardCounts = React.useMemo(() => {
    return filteredRequests.reduce(
      (acc, req) => {
        if (req.latestStatus === "Pending") acc.pending++
        else if (req.latestStatus === "Approved") acc.approved++
        else if (req.latestStatus === "Rejected") acc.rejected++
        acc.total++
        return acc
      },
      { total: 0, pending: 0, approved: 0, rejected: 0 }
    )
  }, [filteredRequests])

  // --- Data for the Area Chart ---
  const areaChartData = React.useMemo(() => {
    // ... (logic from previous step, no changes)
    const countsByDate: Record<string, number> = {}
    for (const req of filteredRequests) {
      countsByDate[req.start_date] = (countsByDate[req.start_date] || 0) + 1
    }
    return Object.entries(countsByDate)
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [filteredRequests])

  // --- Data for the Bar Chart (Total by dept) ---
  const departmentChartData = React.useMemo(() => {
    // ... (logic from previous step, no changes)
    const countsByDept: Record<string, number> = {}
    for (const req of filteredRequests) {
      const department = employeeDeptMap.get(req.employee_id) || "Unknown"
      countsByDept[department] = (countsByDept[department] || 0) + 1
    }
    return Object.entries(countsByDept).map(([deptName, total]) => ({
      department: deptName,
      total: total,
    }))
  }, [filteredRequests, employeeDeptMap])

  // --- Config for BOTH Pie Charts ---
  const pieChartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      approved: { label: "Approved" },
      count: { label: "Count" }, // Add a label for employee count
    }

    departments.forEach((dept, index) => {
      config[dept.department_name] = {
        label: dept.department_name,
        color: DEPARTMENT_COLORS[index % DEPARTMENT_COLORS.length],
      }
    })
    config["Unknown"] = {
      label: "Unknown",
      color: DEPARTMENT_COLORS[departments.length % DEPARTMENT_COLORS.length],
    }
    return config
  }, [departments])

  // --- Data for the Pie Chart (Approved by dept) ---
  const approvedByDeptData = React.useMemo(() => {
    // ... (logic from previous step, no changes)
    const countsByDept: Record<string, number> = {}
    for (const req of filteredRequests) {
      if (req.latestStatus !== 'Approved') continue
      const department = employeeDeptMap.get(req.employee_id) || "Unknown"
      countsByDept[department] = (countsByDept[department] || 0) + 1
    }
    return Object.entries(countsByDept).map(([deptName, total]) => ({
      department: deptName,
      approved: total,
      fill: pieChartConfig[deptName]?.color || "var(--chart-1)"
    }))
  }, [filteredRequests, employeeDeptMap, pieChartConfig])


  // --- 1. NEW: Data for the Donut Chart (Employees by dept) ---
  // This data is NOT filtered by time.
  const employeeByDeptData = React.useMemo(() => {
    const countsByDept: Record<string, number> = {}

    // Count all employees from the prop
    for (const emp of employees) {
      const department = emp.department || "Unknown";
      countsByDept[department] = (countsByDept[department] || 0) + 1
    }

    // Map to the format the pie chart needs, adding the fill color
    return Object.entries(countsByDept).map(([deptName, total]) => ({
      department: deptName,
      count: total, // We'll use "count" as the dataKey
      fill: pieChartConfig[deptName]?.color || "var(--chart-1)"
    }))
  }, [employees, pieChartConfig]) // Depends on employees list and the color config


  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", marginBottom: "100px" }}>
      {/* --- Cards --- */}
      <Box sx={{ flex: 3, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, paddingY: "5px" }}>
        {/* ... (DashCard components) ... */}
        <DashCard title="Total" value={dashboardCounts.total} />
        <DashCard title="Pending" value={dashboardCounts.pending} />
        <DashCard title="Approved" value={dashboardCounts.approved} />
        <DashCard title="Rejected" value={dashboardCounts.rejected} />
      </Box>

      {/* --- Area Chart --- */}
      <Box sx={{ flex: 6, paddingX: "25px", paddingY: "10px" }}>
        {/* ... (ChartAreaInteractive component) ... */}
        <ChartAreaInteractive
          data={areaChartData}
          chartConfig={totalChartConfig}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          dataKey="total"
        />
      </Box>

      {/* --- Bar & Pie Charts --- */}
      <Box sx={{ flex: 3, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, paddingX: "30px", paddingY: "10px" }}>
        <ChartBarHorizontal data={departmentChartData} />

        {/* --- 2. Pass new props to Donut Chart --- */}
        <ChartPieDonutText
          data={employeeByDeptData}
          config={pieChartConfig}
          dataKey="count"
          nameKey="department"
          totalLabel="Employees"
        />

        <ChartPieLabel
          data={approvedByDeptData}
          config={pieChartConfig}
          dataKey="approved"
          nameKey="department"
        />
      </Box>
    </Box>
  )
}