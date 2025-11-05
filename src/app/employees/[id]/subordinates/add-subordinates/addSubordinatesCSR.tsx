"use client"
import React, { useState, useMemo } from "react"; // Import React and useMemo
import Box from "@mui/material/Box";
import SearchBar from "@/app/components/SearchBar";
import { Button, FormControl } from "@mui/material";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import InputLabel from '@mui/material/InputLabel';
import { EmployeeType } from "@/app/lib/mockDataEmp";
import AddSubordinatesTable from "@/app/components/SubComp/AddSubordinatesTable";
import { useRouter } from "next/navigation";

export default function Addsubordinates({ initialRows, currEmployee }: { initialRows: EmployeeType[], currEmployee: EmployeeType }) {
    const [searchText, setSearchText] = useState("");
    const router = useRouter();

    // --- STATE LIFTED UP ---
    // 'selected' state now lives here so the 'Add' button can access it
    const [selected, setSelected] = React.useState<readonly number[]>([]);

    // FIXED: Filter by same DIVISION, no supervisor, and not self
    // This is the base list of employees who can be added
    const addableEmployees = useMemo(() => {
        return initialRows.filter(e => 
            e.division === currEmployee?.division && 
            e.supervisor_id === null && 
            e.employee_id !== currEmployee.employee_id
        );
    }, [initialRows, currEmployee]);


    // Filter based on search text
    const filteredRows = useMemo(() => {
        let rows = addableEmployees; // Start with the pre-filtered list

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
    }, [addableEmployees, searchText]); // Re-run only when these change

    // --- HELPER FUNCTIONS LIFTED UP ---
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            // Use filteredRows to select only visible, correct employees
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

    // --- ADD HANDLER ---
    const handleAdd = () => {
        // For now, we'll just log the IDs to be added and navigate back
        // In a real app, you'd call an API here.
        console.log(`Adding ${selected.length} subordinates to ${currEmployee.first_name}:`, selected);
        
        // Clear selection and navigate back to the previous page
        setSelected([]);
        router.push(`/employees/${currEmployee.employee_id}/subordinates`);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", marginBottom: "100px" }}>
            <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                <Typography variant="h3" color="primary.main">
                    Add Subordinate
                </Typography>
            </Box>

            <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                <Box sx={{ flex: 5, display: "flex", justifyContent: "flex-end" }}>
                    <SearchBar
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onSubmit={(text) => console.log("Search for:", text)}
                    />
                </Box>
            </Box>

            <Box sx={{ flex: 7, display: "flex", alignItems: "flex-end", flexDirection: "column" }}>
                {/* Pass all state and handlers to the "dumb" table */}
                <AddSubordinatesTable 
                    rows={filteredRows} 
                    currEmployee={currEmployee}
                    selected={selected}
                    onSelectAllClick={handleSelectAllClick}
                    onRowClick={handleRowClick}
                />
                <Button 
                    variant="contained" 
                    sx={{ mt: 2, width: '100px' }} 
                    onClick={handleAdd}
                    disabled={selected.length === 0} 
                >
                    Add
                </Button>
            </Box>
        </Box>
    );
}
