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
// FIXED: Import from new snake_case file
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
const DIVISION_COLORS = [ // Renamed for clarity
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

// FIXED: Renamed prop 'departments' to 'divisions'
export default function HomePage({ leaveRequests, employees, divisions }: { leaveRequests: LeaveRequestType[], employees: EmployeeType[], divisions: DivisionType[] }) {
  const [timeRange, setTimeRange] = React.useState("7d")

  // --- FIXED: Map for quick employee DIVISION lookups ---
  const employeeDivMap = React.useMemo(() => {
    return new Map(employees.map(emp => [emp.employee_id, emp.division]))
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

  // --- FIXED: Calculate dashboard totals (using snake_case) ---
  const dashboardCounts = React.useMemo(() => {
    return filteredRequests.reduce(
      (acc, req) => {
        // FIXED: Use latest_status
        if (req.latest_status === "Pending") acc.pending++
        else if (req.latest_status === "Approved") acc.approved++
        else if (req.latest_status === "Rejected") acc.rejected++
        acc.total++
        return acc
      },
      { total: 0, pending: 0, approved: 0, rejected: 0 }
    )
  }, [filteredRequests])

  // --- Data for the Area Chart (No change) ---
  const areaChartData = React.useMemo(() => {
    const countsByDate: Record<string, number> = {}
    for (const req of filteredRequests) {
      countsByDate[req.start_date] = (countsByDate[req.start_date] || 0) + 1
    }
    return Object.entries(countsByDate)
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [filteredRequests])

  // --- FIXED: Data for the Bar Chart (Total by DIVISION) ---
  const divisionChartData = React.useMemo(() => {
    const countsByDiv: Record<string, number> = {}
    for (const req of filteredRequests) {
      // FIXED: Use employeeDivMap
      const division = employeeDivMap.get(req.employee_id) || "Unknown"
      countsByDiv[division] = (countsByDiv[division] || 0) + 1
    }
    return Object.entries(countsByDiv).map(([divName, total]) => ({
      division: divName, // FIXED: Use 'division' prop
      total: total,
    }))
  }, [filteredRequests, employeeDivMap])

  // --- FIXED: Config for BOTH Pie Charts (based on Divisions) ---
  const pieChartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      approved: { label: "Approved" },
      count: { label: "Count" }, // Add a label for employee count
    }

    // FIXED: Iterate over 'divisions' prop
    divisions.forEach((div, index) => {
      config[div.division_name] = {
        label: div.division_name,
        color: DIVISION_COLORS[index % DIVISION_COLORS.length],
      }
    })
    config["Unknown"] = {
      label: "Unknown",
      color: DIVISION_COLORS[divisions.length % DIVISION_COLORS.length],
    }
    return config
  }, [divisions]) // FIXED: Depend on 'divisions'

  // --- FIXED: Data for the Pie Chart (Approved by DIVISION) ---
  const approvedByDivData = React.useMemo(() => {
    const countsByDiv: Record<string, number> = {}
    for (const req of filteredRequests) {
      // FIXED: Use latest_status
      if (req.latest_status !== 'Approved') continue
      // FIXED: Use employeeDivMap
      const division = employeeDivMap.get(req.employee_id) || "Unknown"
      countsByDiv[division] = (countsByDiv[division] || 0) + 1
    }
    return Object.entries(countsByDiv).map(([divName, total]) => ({
      division: divName, // FIXED: Use 'division' prop
      approved: total,
      fill: pieChartConfig[divName]?.color || "var(--chart-1)"
    }))
  }, [filteredRequests, employeeDivMap, pieChartConfig])


  // --- FIXED: Data for the Donut Chart (Employees by DIVISION) ---
  const employeeByDivData = React.useMemo(() => {
    const countsByDiv: Record<string, number> = {}

    // Count all employees from the prop
    for (const emp of employees) {
      // FIXED: Group by 'division'
      const division = emp.division || "Unknown";
      countsByDiv[division] = (countsByDiv[division] || 0) + 1
    }

    // Map to the format the pie chart needs, adding the fill color
    return Object.entries(countsByDiv).map(([divName, total]) => ({
      division: divName, // FIXED: Use 'division' prop
      count: total, // We'll use "count" as the dataKey
      fill: pieChartConfig[divName]?.color || "var(--chart-1)"
    }))
  }, [employees, pieChartConfig]) // Depends on employees list and the color config


  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", marginBottom: "100px" }}>
      {/* --- Cards --- */}
      <Box sx={{ flex: 3, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, paddingY: "5px" }}>
        <DashCard title="Total" value={dashboardCounts.total} />
        <DashCard title="Pending" value={dashboardCounts.pending} />
        <DashCard title="Approved" value={dashboardCounts.approved} />
        <DashCard title="Rejected" value={dashboardCounts.rejected} />
      </Box>

      {/* --- Area Chart --- */}
      <Box sx={{ flex: 6, paddingX: "25px", paddingY: "10px" }}>
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
        {/* FIXED: Pass 'divisionChartData' */}
        <ChartBarHorizontal data={divisionChartData} />

        {/* FIXED: Pass 'employeeByDivData' and 'division' as nameKey */}
        <ChartPieDonutText
          data={employeeByDivData}
          config={pieChartConfig}
          dataKey="count"
          nameKey="division"
        />

        {/* FIXED: Pass 'approvedByDivData' and 'division' as nameKey */}
        <ChartPieLabel
          data={approvedByDivData}
          config={pieChartConfig}
          dataKey="approved"
          nameKey="division"
        />
      </Box>
    </Box>
  )
}

