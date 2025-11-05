"use client"
import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import SearchBar from "../components/SearchBar";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from '@mui/material/Select';
// FIXED: Import new snake_case type
import LeaveTable from "../components/LeaveComp/LeaveTable";
import { useRouter } from "next/navigation";
// NEW: Imports for the sort dropdown
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { LeaveRequest } from "@/types/leaveRequest";
import dayjs from "dayjs";

export default function LeaveRequests({ initialRows }: { initialRows: LeaveRequest[] }) {
  const [searchText, setSearchText] = useState("");
  // NEW: State for sorting, defaults to 'newest'
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const router = useRouter();

  // NEW: Combined filter and sort logic
  const filteredAndSortedRows = useMemo(() => {
  let rows = [...initialRows];

  // 1) filter
  if (searchText) {
    const q = searchText.toLowerCase();
    rows = rows.filter((row) => {
      const fullName = `${row.employeeFirstName} ${row.employeeLastName}`.toLowerCase();
      return (
        fullName.includes(q) ||
        (row.employeeDivisionName ?? "").toLowerCase().includes(q) ||
        String(row.requestID).includes(q) ||
        (row.leaveType ?? "").toLowerCase().includes(q) ||
        (row.latestStatus ?? "").toLowerCase().includes(q) ||
        asSearchString(row.startDate).toLowerCase().includes(q) ||
        asSearchString(row.endDate).toLowerCase().includes(q)
      );
    });
  }

  // 2) sort by latestTimestamp (รองรับทั้ง string/Date)
  rows.sort((a, b) => {
    const timeA = dayjs(a.latestTimestamp as any).valueOf();
    const timeB = dayjs(b.latestTimestamp as any).valueOf();
    return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
  });

  return rows;
}, [initialRows, searchText, sortOrder]);

  // NEW: Handler for the sort dropdown
  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value as 'newest' | 'oldest');
  }

  function asSearchString(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  const d = dayjs(v as any);
  if (d.isValid()) return d.format("YYYY-MM-DD");
  return String(v);


};

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", marginBottom: "100px" }}>
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
        <Typography variant="h3" color="primary.main">
          Leave Requests Management
        </Typography>
      </Box>

      <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
        <Box sx={{ flex: 5, display: "flex", justifyContent: "flex-start" }}>
          {/* (Empty for alignment) */}
        </Box>
        <Box sx={{ flex: 5, display: "flex", justifyContent: "flex-end" }}>

          {/* NEW: Sort By Dropdown */}
          <FormControl sx={{ minWidth: 180, mr: 1 }}>
            <InputLabel id="sort-by-label">Sort by</InputLabel>
            <Select
              labelId="sort-by-label"
              label="Sort by"
              value={sortOrder}
              onChange={handleSortChange}
              sx={{ bgcolor: "white" }}
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
            </Select>
          </FormControl>

          <SearchBar
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSubmit={(text) => console.log("Search for:", text)}
          />
        </Box>
      </Box>

      <Box sx={{ flex: 7, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingX: "1rem" }}>
        <LeaveTable rows={filteredAndSortedRows} />
      </Box>

    </Box>
  );
}

