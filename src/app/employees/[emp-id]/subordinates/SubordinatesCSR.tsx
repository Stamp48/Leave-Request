"use client"
import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import SearchBar from "../../../components/SearchBar";
import { Button, FormControl } from "@mui/material";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import InputLabel from '@mui/material/InputLabel';
import { EmployeeType } from "@/app/lib/mockDataEmp";
import SubordinatesTable from "@/app/components/SubComp/SubordinatesTable";
import { useRouter } from "next/navigation";

export default function Subordinates({ 
  initialRows, 
  currEmployee,
  departmentsInDivision // NEW: Accept prop from server
}: { 
  initialRows: EmployeeType[], 
  currEmployee: EmployeeType,
  departmentsInDivision: string[] // NEW
}) {
  const [searchText, setSearchText] = useState("");
  // NEW: State for the department filter
  const [selectedDepartment, setSelectedDepartment] = useState(""); 
  const router = useRouter();

  const [subordinatesRows, setSubordinatesRows] = useState(initialRows);
  const [selected, setSelected] = useState<readonly number[]>([]);

  const handleDelete = () => { 
    const newRows = subordinatesRows.filter(row => !selected.includes(row.employee_id));
    setSubordinatesRows(newRows);
    setSelected([]);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // FIXED: Filter rows before selecting all
      const newSelected = filteredRows.map((n) => n.employee_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleRowClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };
  
  // NEW: Handler for the department dropdown
  const handleDepartmentChange = (event: SelectChangeEvent<string>) => {
    setSelectedDepartment(event.target.value);
  };

  // NEW: Use useMemo for efficient, combined filtering
  const filteredRows = useMemo(() => {
    let rows = subordinatesRows; // Start with the (deletable) state

    // 1. Filter by Department
    if (selectedDepartment) {
      rows = rows.filter(row => row.department === selectedDepartment);
    }

    // 2. Filter by Search Text
    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();
      rows = rows.filter((row) => {
        // Check full name
        const fullName = `${row.first_name} ${row.last_name}`.toLowerCase();
        if (fullName.includes(lowerSearchText)) {
          return true;
        }
        // Check all other values (safely)
        return Object.values(row).some(value =>
          value && value.toString().toLowerCase().includes(lowerSearchText)
        );
      });
    }
    
    return rows;
  }, [subordinatesRows, selectedDepartment, searchText]);


  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", marginBottom: "100px" }}>
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
        <Typography variant="h3" color="primary.main">
          Subordinate Management
        </Typography>
      </Box>

      <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
        <Box sx={{ flex: 5, display: "flex", justifyContent: "flex-start" }}>
          {/* (Empty box for alignment) */}
        </Box>
        <Box sx={{ flex: 5, display: "flex", justifyContent: "flex-end" }}>
          
          {/* NEW: Department Filter Dropdown */}
          <FormControl sx={{ minWidth: 200, mr: 1 }}>
            <InputLabel id="department-filter-label">Filter by Department</InputLabel>
            <Select
              labelId="department-filter-label"
              label="Filter by Department"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              sx={{ bgcolor: "white" }}
            >
              <MenuItem value="">
                <em>All Departments</em>
              </MenuItem>
              {departmentsInDivision.map(deptName => (
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

      <Box sx={{ flex: 7, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
        <SubordinatesTable
          rows={filteredRows}
          currEmployee={currEmployee}
          onDelete={handleDelete}
          selected={selected}
          onSelectAllClick={handleSelectAllClick}
          onRowClick={handleRowClick}
        />
      </Box>
    </Box>
  );
}
