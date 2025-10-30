"use client"
import { useState } from "react";
import Box from "@mui/material/Box";
import SearchBar from "../components/SearchBar";
import EmployeesTable from "../components/EmployeeComp/EmployeesTable";
import { Button, FormControl } from "@mui/material";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import InputLabel from '@mui/material/InputLabel';
import Avatar from '@mui/material/Avatar';
import { EmployeeType } from "./page";

import { useRouter } from "next/navigation";



export default function Employees({ initialRows }: { initialRows: EmployeeType[] }) {
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
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
        <Typography variant="h3" color="primary.main">
          Employee Management
        </Typography>
      </Box>

      <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
        <Box sx={{ flex: 5, display: "flex", justifyContent: "flex-start" }}>
          <Button onClick={() => router.push("/employees/add-employee")} sx={{ bgcolor: "white", mx: 0.5 }}>Add</Button>
        </Box>
        <Box sx={{ flex: 5, display: "flex", justifyContent: "flex-end" }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="filter-label">Filter by</InputLabel>
            <Select
              labelId="filter-label"
              sx={{ bgcolor: "white", mx: 0.5, minWidth: 120 }}
              value={filter}
              label="Filter by"
              onChange={handleFilterChange}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value={"name"}>Name</MenuItem>
              <MenuItem value={"department"}>Department</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="filter-label">Filter by</InputLabel>
            <Select
              labelId="filter-label"
              sx={{ bgcolor: "white", mx: 0.5, minWidth: 120 }}
              value={filter}
              label="Filter by"
              onChange={handleFilterChange}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value={"name"}>Name</MenuItem>
              <MenuItem value={"department"}>Department</MenuItem>
            </Select>
          </FormControl>
          {/* <Button sx={{ bgcolor: "white", mx: 0.5 }}>Sort</Button> */}
          <SearchBar
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSubmit={(text) => console.log("Search for:", text)}
          />
        </Box>
      </Box>

      <Box sx={{ flex: 7, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingX: "1rem"}}>
        <EmployeesTable rows={filteredRows} />
      </Box>


    </Box>
  );
}
