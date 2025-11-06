"use client"

import * as React from "react"
import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import DashCard from "./components/DashComp/DashCard"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { ChartBarHorizontal } from "@/components/chart-bar-horizontal"
import { ChartPieDonutText } from "@/components/chart-pie-donut-text"
import { ChartPieLabel } from "@/components/chart-pie-label"

// --- Import your REAL UI types ---
import type { ChartConfig } from "@/components/ui/chart"
// FIXED: Import the REAL UI types
import { LeaveRequest } from "@/types/leaveRequest"
import { EmployeeWithNames } from "@/types/employeeWithNames"
import { Division } from "@/types/division"

// This config is for the Area Chart
const totalChartConfig = {
  total: {
    label: "Total Requests",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

// --- Define colors for the Pie Charts ---
const DIVISION_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

// FIXED: Renamed props to use real UI types
export default function HomePage({ leaveRequests, employees, divisions }: { leaveRequests: LeaveRequest[], employees: EmployeeWithNames[], divisions: Division[] }) {
  const [timeRange, setTimeRange] = React.useState("7d")

  // --- FIXED: Map for quick employee DIVISION lookups (using camelCase) ---
  const employeeDivMap = React.useMemo(() => {
    return new Map(employees.map(emp => [emp.employeeID, emp.divisionName]))
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
      // FIXED: req.startDate is now a Date object
      const reqDate = new Date(req.startDate)
      return reqDate >= startDate
    })
  }, [leaveRequests, timeRange])

  // --- FIXED: Calculate dashboard totals (using camelCase) ---
  const dashboardCounts = React.useMemo(() => {
    return filteredRequests.reduce(
      (acc, req) => {
        // FIXED: Use camelCase latestStatus
        if (req.latestStatus === "รออนุมัติ") acc.pending++
        else if (req.latestStatus === "อนุมัติ") acc.approved++
        else if (req.latestStatus === "ปฏิเสธ") acc.rejected++
        acc.total++
        return acc
      },
      { total: 0, pending: 0, approved: 0, rejected: 0 }
    )
  }, [filteredRequests])

  // --- Data for the Area Chart (FIXED) ---
  // ใน HomePageCSR.tsx เฉพาะจุดแปลงวันที่
  const areaChartData = React.useMemo(() => {
    const countsByDate: Record<string, number> = {}
    for (const req of filteredRequests) {
      const dateObj = req.startDate instanceof Date ? req.startDate : new Date(req.startDate as any);
      const dateString = dateObj.toLocaleDateString('en-CA'); // YYYY-MM-DD
      countsByDate[dateString] = (countsByDate[dateString] || 0) + 1
    }
    return Object.entries(countsByDate)
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [filteredRequests])


  // --- FIXED: Data for the Bar Chart (Total by DIVISION) ---
  const divisionChartData = React.useMemo(() => {
    const countsByDiv: Record<string, number> = {}
    for (const req of filteredRequests) {
      // FIXED: Use camelCase employeeID
      const division = employeeDivMap.get(req.employeeID) || "Unknown"
      countsByDiv[division] = (countsByDiv[division] || 0) + 1
    }
    return Object.entries(countsByDiv).map(([divName, total]) => ({
      division: divName, // Use 'division' prop
      total: total,
    }))
  }, [filteredRequests, employeeDivMap])

  // --- FIXED: Config for BOTH Pie Charts (based on Divisions) ---
  const pieChartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      approved: { label: "Approved" },
      count: { label: "Count" },
    }

    divisions.forEach((div, index) => {
      // FIXED: Use camelCase divisionName
      config[div.divisionName] = {
        label: div.divisionName,
        color: DIVISION_COLORS[index % DIVISION_COLORS.length],
      }
    })
    config["Unknown"] = {
      label: "Unknown",
      color: DIVISION_COLORS[divisions.length % DIVISION_COLORS.length],
    }
    return config
  }, [divisions])

  // --- FIXED: Data for the Pie Chart (Approved by DIVISION) ---
  const approvedByDivData = React.useMemo(() => {
    const countsByDiv: Record<string, number> = {}
    for (const req of filteredRequests) {
      // FIXED: Use camelCase latestStatus
      if (req.latestStatus !== 'อนุมัติ') continue
      // FIXED: Use camelCase employeeID
      const division = employeeDivMap.get(req.employeeID) || "Unknown"
      countsByDiv[division] = (countsByDiv[division] || 0) + 1
    }
    return Object.entries(countsByDiv).map(([divName, total]) => ({
      division: divName, // Use 'division' prop
      approved: total,
      fill: pieChartConfig[divName]?.color || "var(--chart-1)"
    }))
  }, [filteredRequests, employeeDivMap, pieChartConfig])


  // --- FIXED: Data for the Donut Chart (Employees by DIVISION) ---
  const employeeByDivData = React.useMemo(() => {
    const countsByDiv: Record<string, number> = {}

    for (const emp of employees) {
      // FIXED: Group by camelCase divisionName
      const division = emp.divisionName || "Unknown";
      countsByDiv[division] = (countsByDiv[division] || 0) + 1
    }

    return Object.entries(countsByDiv).map(([divName, total]) => ({
      division: divName, // Use 'division' prop
      count: total,
      fill: pieChartConfig[divName]?.color || "var(--chart-1)"
    }))
  }, [employees, pieChartConfig])


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
        <ChartBarHorizontal data={divisionChartData} />

        <ChartPieDonutText
          data={employeeByDivData}
          config={pieChartConfig}
          dataKey="count"
          nameKey="division"
        />

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