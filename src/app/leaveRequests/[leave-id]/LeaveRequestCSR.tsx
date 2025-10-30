'use client';
import { LeaveRequestType } from "@/app/lib/mockDataLeaveRequest";
import { Box, Button, Card, CardContent, CardHeader, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Detail from "@/app/components/Detail";
import { calculateLeaveDuration } from "@/app/lib/utils";
import { useRouter } from "next/navigation";

export default function LeaveRequest({ leaveRequest }: { leaveRequest: LeaveRequestType }) {
    const router = useRouter();

    return (

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, padding: 4, backgroundColor: "#1976d2", borderRadius:"25px" }}>
            <Typography variant="h3" color="white">
                Leave Request Detail
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "7fr 3fr", gap: 2 }}>


                <Card sx={{ flexGrow: 1, boxShadow: 3, borderRadius: 2 }}>
                    <CardHeader
                        onClick={() => router.push(`/employees/${leaveRequest.employeeId}`)}
                        avatar={<Avatar alt={`${leaveRequest.employeeFirstname} ${leaveRequest.employeeLastname}`}
                            src={leaveRequest.employeeAvatarUrl}
                            sx={{ width: 150, height: 150, marginTop: "20px", marginLeft: "20px", marginRight: "15px" }}
                        />
                        }
                        title={<Typography variant="h4">{leaveRequest.employeeFirstname} {leaveRequest.employeeLastname}</Typography>}
                        subheader={
                            <Box>
                                <Typography variant="subtitle1">{leaveRequest.employeePosition}</Typography>
                                <Typography variant="subtitle2">Employee ID: {leaveRequest.employeeId}</Typography>
                            </Box>
                        }
                    />
                    <CardContent>
                        <Typography variant="h5" sx={{ marginLeft: "25px" }}>Request Information ID: {leaveRequest.requestId}</Typography>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                            <Detail label="Employee" text={
                                leaveRequest.employeeFirstname + " " + leaveRequest.employeeLastname
                            } />
                            <Detail label="Leave Type" text={leaveRequest.leaveType} />
                        </Box>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                            <Detail label="Start Date" text={leaveRequest.startDate} />
                            <Detail label="End Date" text={leaveRequest.endDate} />
                        </Box>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                            <Detail label="Duration" text={calculateLeaveDuration(leaveRequest).toString()} />
                            <Detail label="Status" text={leaveRequest.latestStatus} />
                        </Box>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                            <Detail label="Reason" text={leaveRequest.reason} />
                        </Box>

                        {leaveRequest.latestStatus === "Rejected" && (
                            <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                                <Detail label="Admin's Comment" text={leaveRequest.rejectionReason || "N/A"} />
                            </Box>
                        )}

                    </CardContent>
                </Card>
            </Box>



        </Box>
    );
}