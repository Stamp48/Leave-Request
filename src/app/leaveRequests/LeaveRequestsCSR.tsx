"use client"
import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import SearchBar from "../components/SearchBar";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from '@mui/material/Select';
// FIXED: Import new snake_case type
import { LeaveRequestType } from "@/app/lib/mockDataLeaveRequest";
import LeaveTable from "../components/LeaveComp/LeaveTable";
import { useRouter } from "next/navigation";
// NEW: Imports for the sort dropdown
import { FormControl, InputLabel, MenuItem } from "@mui/material";

export default function LeaveRequests({ initialRows }: { initialRows: LeaveRequestType[] }) {
  const [searchText, setSearchText] = useState("");
  // NEW: State for sorting, defaults to 'newest'
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const router = useRouter();

  // NEW: Combined filter and sort logic
  const filteredAndSortedRows = useMemo(() => {
    let rows = [...initialRows]; // Start with the server-sorted list

    // 1. Apply search filter
    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();

      // --- UPDATED SEARCH LOGIC (Based on table columns) ---
      rows = rows.filter((row) => {
        const fullName = `${row.employee_first_name} ${row.employee_last_name}`.toLowerCase();

        // Check only the fields visible in the table
        const isMatch =
          fullName.includes(lowerSearchText) ||
          row.employee_division_name.toLowerCase().includes(lowerSearchText) ||
          row.request_id.toString().includes(lowerSearchText) ||
          row.leave_type.toLowerCase().includes(lowerSearchText) ||
          row.latest_status.toLowerCase().includes(lowerSearchText) ||
          row.start_date.toLowerCase().includes(lowerSearchText) ||
          row.end_date.toLowerCase().includes(lowerSearchText);

        return isMatch;
      });
      // --- END OF UPDATED LOGIC ---
    }

    // 2. Apply client-side sorting
    // This sorting runs *after* the search
    rows.sort((a, b) => {
      const timeA = new Date(a.latest_timestamp).getTime();
      const timeB = new Date(b.latest_timestamp).getTime();
      return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
    });

    return rows;
  }, [initialRows, searchText, sortOrder]); // Re-run when any of these change

  // NEW: Handler for the sort dropdown
  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value as 'newest' | 'oldest');
  }

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

