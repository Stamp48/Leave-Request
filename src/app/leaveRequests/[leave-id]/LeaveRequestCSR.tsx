'use client';
import { LeaveRequestType } from "@/app/lib/mockDataLeaveRequest";
import { Box, Button, Card, CardContent, CardHeader, Typography, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Detail from "@/app/components/Detail";
import { calculateLeaveDuration } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { parseISO, startOfDay } from "date-fns";
import { useState } from "react";
import * as React from "react";
import { StatusHistoryType } from "@/app/lib/mockStatusHistory"
import LeaveHistory from "@/app/components/LeaveComp/LeaveHistory";


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function LeaveRequest({ leaveRequest, history }: { leaveRequest: LeaveRequestType, history: StatusHistoryType[] }) {
    const router = useRouter();

    const today = startOfDay(new Date());

    const startDate = parseISO(leaveRequest.start_date);

    const canRevoke =
        leaveRequest.latest_status === "Approved" &&
        startDate > today;

    const [open, setOpen] = useState(false);
    // 2. Add state for your text field
    const [revokeReason, setRevokeReason] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    // 3. Update handleClose to reset the reason
    const handleClose = () => {
        setOpen(false);
        setRevokeReason(""); // Reset reason on close
    };

    // 4. Create a submit handler
    const handleRevokeSubmit = () => {
        // TODO: Add your API call here
        console.log("Revoking request with reason:", revokeReason);
        handleClose(); // Close and reset the dialog
    };


    return (

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, padding: 4, backgroundColor: "#1976d2", borderRadius: "25px" }}>
            <Typography variant="h3" color="white">
                Leave Request Detail
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "7fr 3fr", gap: 2 }}>
                <Card sx={{ flexGrow: 1, boxShadow: 3, borderRadius: 2 }}>
                    <CardHeader
                        onClick={() => router.push(`/employees/${leaveRequest.employee_id}`)}
                        avatar={<Avatar alt={`${leaveRequest.employee_first_name} ${leaveRequest.employee_last_name}`}
                            src={leaveRequest.employee_profile}
                            sx={{ width: 150, height: 150, marginTop: "20px", marginLeft: "20px", marginRight: "15px" }}
                        />
                        }
                        title={<Typography variant="h4">{leaveRequest.employee_first_name} {leaveRequest.employee_last_name}</Typography>}
                        subheader={
                            <Box>
                                <Typography variant="subtitle1">{leaveRequest.employee_position}</Typography>
                                <Typography variant="subtitle2">Employee ID: {leaveRequest.employee_id}</Typography>
                            </Box>
                        }
                    />
                    <CardContent>
                        {/* ... (all your Detail components remain the same) ... */}
                        <Typography variant="h5" sx={{ marginLeft: "25px" }}>Request Information ID: {leaveRequest.request_id}</Typography>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                            <Detail label="Employee" text={
                                leaveRequest.employee_first_name + " " + leaveRequest.employee_last_name
                            } />
                            <Detail label="Leave Type" text={leaveRequest.leave_type} />
                        </Box>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                            <Detail label="Start Date" text={leaveRequest.start_date} />
                            <Detail label="End Date" text={leaveRequest.end_date} />
                        </Box>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                            <Detail label="Duration" text={calculateLeaveDuration(leaveRequest).toString()} />
                            <Detail label="Status" text={leaveRequest.latest_status} />
                        </Box>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                            <Detail label="Reason" text={leaveRequest.reason} />
                        </Box>

                        {leaveRequest.latest_status === "Rejected" && (
                            <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                                <Detail label="Supervisor's Reason" text={leaveRequest.rejectionReason || "N/A"} />
                            </Box>
                        )}


                        {/* === DIALOG CODE UPDATED === */}
                        <React.Fragment>
                            {canRevoke && (
                                <Box sx={{ paddingLeft: "30px", my: "20px" }}>
                                    <Button variant="contained" color="warning" onClick={handleClickOpen}>
                                        Revoke Request
                                    </Button>
                                </Box>
                            )}

                            <Dialog
                                open={open}
                                onClose={handleClose} // Use handleClose to reset state on backdrop click
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Confirm Request Revocation"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description" sx={{ mb: 2 }}>
                                        Are you sure you want to revoke this approved leave request? Please provide a reason below.
                                    </DialogContentText>
                                    {/* 5. Add the TextField */}
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="reason"
                                        name="reason"
                                        label="Reason for Revocation"
                                        type="text"
                                        fullWidth
                                        variant="outlined" // Switched to outlined for better visibility
                                        value={revokeReason}
                                        onChange={(e) => setRevokeReason(e.target.value)}
                                        multiline
                                        rows={3}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    {/* 6. Update Buttons */}
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button
                                        onClick={handleRevokeSubmit}
                                        color="warning"
                                        disabled={!revokeReason} // Button is disabled if no reason
                                    >
                                        Revoke
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                        {/* === END OF DIALOG CODE === */}

                    </CardContent>
                </Card>
                <LeaveHistory history={history} />
            </Box>
        </Box>
    );
}