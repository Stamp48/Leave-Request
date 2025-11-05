"use client"
import EmployeeDetail from "@/app/components/EmployeeComp/EmployeeDetail";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EmployeeCard from "@/app/components/EmployeeComp/EmployeeCard";
import CardHeader from '@mui/material/CardHeader';
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { useState } from "react";
import LeaveCard from "@/app/components/LeaveComp/LeaveCard";
import { EmployeeWithNames } from "@/types/employeeWithNames";
import { LeaveRequest } from "@/types/leaveRequest";



export default function Employee({ employee, supervisor, isSupervisor, leaveHistory }: { employee: EmployeeWithNames, supervisor?: EmployeeWithNames, isSupervisor: boolean, leaveHistory: LeaveRequest[] }) {
    const router = useRouter();


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, padding: 4, backgroundColor: "#2E8EE4", borderRadius: "16px" }}>
            <Typography variant="h3" color="white">
                Employee Detail
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "7fr 3fr", gap: 2 }}>
                <EmployeeDetail employee={employee} handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} />

                <LeaveCard leaveHistory={leaveHistory} />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 2,
                }}
            >
                {employee.supervisorID !== null && (
                    <Card sx={{ flex: "0 0 70%", boxShadow: 3, borderRadius: 2 }}>
                        <CardHeader
                            title={<Typography variant="h4" sx={{ ml: 2 }}>Supervisor</Typography>}
                        />
                        <CardContent
                            sx={{ ml: 2 }}
                            onClick={() => supervisor && router.push(`/employees/${supervisor.employeeID}`)}
                        >
                            {supervisor && <EmployeeCard employee={supervisor} />}
                        </CardContent>
                    </Card>
                )}
                {isSupervisor &&
                    <Button variant="contained" onClick={() => router.push(`/employees/${employee.employeeID}/subordinates`)} sx={{
                        bgcolor: 'white', 
                        color: 'primary.main', 
                        '&:hover': {
                            bgcolor: '#f0f0f0' 
                        }
                    }}>
                        Manage Subordinate
                    </Button>
                }
            </Box>


        </Box>
    );
}