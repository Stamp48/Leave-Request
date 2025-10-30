"use client"
import { useState } from "react";
import Box from "@mui/material/Box";
import SearchBar from "@/app/components/SearchBar";
import { Button, FormControl } from "@mui/material";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import InputLabel from '@mui/material/InputLabel';
import { EmployeeType } from "@/app/employees/page";
import AddSubordinatesTable from "@/app/components/SubComp/AddSubordinatesTable";

import { useRouter } from "next/navigation";



export default function Addsubordinates({ initialRows, currEmployee }: { initialRows: EmployeeType[], currEmployee: EmployeeType }) {
    const [searchText, setSearchText] = useState("");
    const [filter, setFilter] = useState("");
    const router = useRouter();


    const noSupInSameDepRows = initialRows.filter(e => e.department === currEmployee?.department && e.supervisorId === undefined && e.id !== currEmployee.id);

    const filteredRows = noSupInSameDepRows.filter((row) => {
        return Object.values(row).some(value =>
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        );
    });


    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", marginBottom: "100px" }}>
            <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                <Typography variant="h3" color="primary.main">
                    Add Subordinate
                </Typography>
            </Box>

            <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>

                <Box sx={{ flex: 5, display: "flex", justifyContent: "flex-end" }}>
                    {/* <Button sx={{ bgcolor: "white", mx: 0.5 }}>Sort</Button> */}
                    <SearchBar
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onSubmit={(text) => console.log("Search for:", text)}
                    />
                </Box>
            </Box>

            <Box sx={{ flex: 7, display: "flex", alignItems: "flex-end",flexDirection:"column" }}>
                <AddSubordinatesTable rows={filteredRows} currEmployee={currEmployee} />
                <Button sx={{ bgcolor: "yello" }}>Add</Button>

            </Box>
        </Box>
    );
}
