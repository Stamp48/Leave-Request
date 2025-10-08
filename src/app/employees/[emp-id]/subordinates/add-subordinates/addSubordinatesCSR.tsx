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



export default function Addsubordinates({ initialRows, currEmployee }: { initialRows: EmployeeType[], currEmployee: EmployeeType | undefined }) {
    const [searchText, setSearchText] = useState("");
    const [filter, setFilter] = useState("");
    const router = useRouter();


    const subordinatesRows = initialRows.filter(e => e.supervisorId === currEmployee?.id);

    const filteredRows = subordinatesRows.filter((row) => {
        return Object.values(row).some(value =>
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        );
    });


    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", marginBottom: "100px" }}>
            <Box sx={{ flex: 1, bgcolor: "primary.main", display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                <Typography variant="h3" color="white">
                    Add Subordinate
                </Typography>
            </Box>

            <Box sx={{ flex: 1, bgcolor: "#f8bbd0", display: "flex", alignItems: "center" }}>

                <Box sx={{ flex: 5, display: "flex", justifyContent: "flex-end" }}>
                    {/* <Button sx={{ bgcolor: "white", mx: 0.5 }}>Sort</Button> */}
                    <SearchBar
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onSubmit={(text) => console.log("Search for:", text)}
                    />
                </Box>
            </Box>

            <Box sx={{ flex: 7, bgcolor: "secondary.main", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
                <AddSubordinatesTable rows={filteredRows} />
            </Box>

            <Box sx={{ flex: 1, bgcolor: "success.main", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <Button sx={{bgcolor:"white"}}>Add</Button>

            </Box>
        </Box>
    );
}
