"use client"
import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import SearchBar from "../components/SearchBar";
import EmployeesTable from "../components/EmployeeComp/EmployeesTable";
import { Button, FormControl, TextField } from "@mui/material"; // Import TextField
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import InputLabel from '@mui/material/InputLabel';
import { EmployeeType } from "@/app/lib/mockDataEmp";

import { useRouter } from "next/navigation";



export default function Employees({ 
  initialRows,
  orgHierarchyData 
}: { 
  initialRows: EmployeeType[],
  orgHierarchyData: Record<string, string[]> 
}) {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  // New state for dropdown filters
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [availableDepartments, setAvailableDepartments] = useState<string[]>([]);
  
  // Get a list of all divisions
  const allDivisions = Object.keys(orgHierarchyData || {});

  // Handler for when the Division dropdown changes
  const handleDivisionChange = (event: SelectChangeEvent<string>) => {
    const division = event.target.value;
    setSelectedDivision(division);
    
    // Reset department when division changes
    setSelectedDepartment(""); 
    
    if (division) {
      setAvailableDepartments(orgHierarchyData[division] || []);
    } else {
      // If "All Divisions" is selected, clear departments
      setAvailableDepartments([]);
    }
  };

  // Handler for when the Department dropdown changes
  const handleDepartmentChange = (event: SelectChangeEvent<string>) => {
    setSelectedDepartment(event.target.value);
  };

  // useMemo will re-calculate the filtered list when any filter changes
  const filteredRows = useMemo(() => {
    let rows = initialRows;

    // 1. Filter by Division
    if (selectedDivision) {
      rows = rows.filter(row => row.division === selectedDivision);
    }

    // 2. Filter by Department (on the already-filtered list)
    if (selectedDepartment) {
      rows = rows.filter(row => row.department === selectedDepartment);
    }

    // 3. Filter by Search Text (on the result of the above)
    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();
      
      // --- UPDATED SEARCH LOGIC ---
      rows = rows.filter((row) => {
        const fullName = `${row.first_name} ${row.last_name}`.toLowerCase();

        // Check only the fields we care about
        const isMatch = 
          row.employee_id.toString().includes(lowerSearchText) ||
          fullName.includes(lowerSearchText) ||
          row.email.toLowerCase().includes(lowerSearchText) ||
          row.division.toLowerCase().includes(lowerSearchText) ||
          row.department.toLowerCase().includes(lowerSearchText) ||
          row.position.toLowerCase().includes(lowerSearchText);
        
        return isMatch;
      });
      // --- END OF UPDATED LOGIC ---
    }

    return rows;
  }, [initialRows, selectedDivision, selectedDepartment, searchText]);


  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", marginBottom: "100px" }}>
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
        <Typography variant="h3" color="primary.main">
          Employee Management
        </Typography>
      </Box>

      <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
        <Box sx={{ flex: 5, display: "flex", justifyContent: "flex-start" }}>
          <Button variant="contained" onClick={() => router.push("/employees/add-employee")} sx={{ mx: 2 }}>
            Add Employee
          </Button>
        </Box>
        <Box sx={{ flex: 5, display: "flex", justifyContent: "flex-end" }}>
          
          {/* FIXED: Division Dropdown */}
          <FormControl sx={{ minWidth: 200, mr: 1 }}>
            <InputLabel id="division-filter-label">Filter by Division</InputLabel>
            <Select
              labelId="division-filter-label"
              label="Filter by Division"
              value={selectedDivision}
              onChange={handleDivisionChange}
              sx={{ bgcolor: "white" }}
            >
              <MenuItem value="">
                <em>All Divisions</em>
              </MenuItem>
              {allDivisions.map(divisionName => (
                <MenuItem key={divisionName} value={divisionName}>
                  {divisionName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* FIXED: Department Dropdown */}
          <FormControl sx={{ minWidth: 200, mr: 1 }}>
            <InputLabel id="department-filter-label">Filter by Department</InputLabel>
            <Select
              labelId="department-filter-label"
              label="Filter by Department"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              disabled={!selectedDivision} // Disabled if no division is selected
              sx={{ bgcolor: "white" }}
            >
              <MenuItem value="">
                <em>All Departments</em>
              </MenuItem>
              {availableDepartments.map(deptName => (
                <MenuItem key={deptName} value={deptName}>
                  {deptName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <SearchBar
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSubmit={(text) => console.log("Search for:", text)}
          />
        </Box>
      </Box>

      <Box sx={{ flex: 7, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingX: "1rem"}}>
        {/* The table now receives the fully filtered list */}
        <EmployeesTable rows={filteredRows} />
      </Box>


    </Box>
  );
}

