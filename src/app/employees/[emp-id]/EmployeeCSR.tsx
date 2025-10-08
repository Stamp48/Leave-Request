"use client"
import EmployeeDetail from "@/app/components/EmployeeComp/EmployeeDetail";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EmployeeCard from "@/app/components/EmployeeComp/EmployeeCard";
import CardHeader from '@mui/material/CardHeader';
import { useRouter } from "next/navigation";
import { EmployeeType } from "../page";
import Button from "@mui/material/Button";



export default function Employee({ employee, supervisor, isSupervisor }: { employee: EmployeeType, supervisor?: EmployeeType, isSupervisor: boolean }) {
    const router = useRouter();

    return (

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, padding: 4, backgroundColor: "#1976d2" }}>
            <Typography variant="h3" color="white">
                Employee Detail
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "7fr 3fr", gap: 2 }}>
                <EmployeeDetail employee={employee} />
                <EmployeeDetail employee={employee} />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 2,
                }}
            >
                {employee.supervisorId !== undefined && (
                    <Card sx={{ flex: "0 0 70%", boxShadow: 3, borderRadius: 2 }}>
                        <CardHeader
                            title={<Typography variant="h4" sx={{ ml: 2 }}>Supervisor</Typography>}
                        />
                        <CardContent
                            sx={{ ml: 2 }}
                            onClick={() => supervisor && router.push(`/employees/${supervisor.id}`)}
                        >
                            {supervisor && <EmployeeCard employee={supervisor} />}
                        </CardContent>
                    </Card>
                )}
                {isSupervisor &&
                    <Button variant="contained" color="secondary" onClick={() => router.push(`/employees/${employee.id}/subordinates`)}>
                        Manage Subordinate
                    </Button>
                }
            </Box>


        </Box>
    );
}