"use client"
import { useState } from "react";
import Box from "@mui/material/Box";
import SearchBar from "../components/SearchBar";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LeaveRequestType } from "@/app/lib/mockDataLeaveRequest";
import LeaveTable from "../components/LeaveComp/LeaveTable";

import { EmployeeType } from "@/app/lib/mockDataEmp";

import { useRouter } from "next/navigation";



export default function LeaveRequests({ initialRows }: { initialRows: LeaveRequestType[] }) {
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("");
  const router = useRouter();

  const filteredRows = initialRows.filter((row) => {
    if (filter) {
      return row[filter as keyof EmployeeType].toString().toLowerCase().includes(searchText.toLowerCase());
    } else {
      return Object.values(row).some(value =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      );
    }
  });

  const handleFilterChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setFilter(value);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", marginBottom: "100px" }}>
      <Box sx={{ flex: 1, bgcolor: "primary.main", display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
        <Typography variant="h3" color="white">
          Leave Requests Management
        </Typography>
      </Box>

      <Box sx={{ flex: 1, bgcolor: "#f8bbd0", display: "flex", alignItems: "center" }}>
        <Box sx={{ flex: 5, display: "flex", justifyContent: "flex-start" }}>
        </Box>
        <Box sx={{ flex: 5, display: "flex", justifyContent: "flex-end" }}>
          <SearchBar
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSubmit={(text) => console.log("Search for:", text)}
          />
        </Box>
      </Box>

      <Box sx={{ flex: 7, bgcolor: "secondary.main", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
        <LeaveTable rows={filteredRows} />
      </Box>

      <Box sx={{ flex: 1, bgcolor: "success.main", display: "flex", alignItems: "center", justifyContent: "center" }}>
        yoo
      </Box>
    </Box>
  );
}
