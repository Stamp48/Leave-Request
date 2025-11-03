'use client';
// FIXED: Import new snake_case type
import { LeaveRequestType } from "@/app/lib/mockDataLeaveRequest";
import { Box, Button, Card, CardContent, CardHeader, Typography, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Detail from "@/app/components/Detail";
import { calculateLeaveDuration } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { parseISO, startOfDay } from "date-fns";
import { useState } from "react";
import * as React from "react";
// FIXED: Import new snake_case type
import { StatusHistoryType } from "@/app/lib/mockStatusHistory";
import LeaveHistory from "@/app/components/LeaveComp/LeaveHistory";
// NEW: Import Attachment types and an icon
import { AttachmentType } from "@/app/lib/mockAttachment";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


/**
 * NEW: Helper function to provide detailed duration text.
 * This reads the new half-day booleans.
 */
const formatDurationDetails = (request: LeaveRequestType): string => {
    const totalDuration = calculateLeaveDuration(request);
    let details: string[] = [];

    // Check for single half-day
    if (request.is_half_day) {
        details.push(request.is_morning ? "Half Day (Morning)" : "Half Day (Afternoon)");
    } else {
        // Check for multi-day half-days
        if (request.is_first_half_day) {
            details.push("First day is half-day");
        }
        if (request.is_last_half_day) {
            details.push("Last day is half-day");
        }
    }

    const dayString = totalDuration === 1 ? "day" : "days";
    if (details.length === 0) {
        return `${totalDuration} ${dayString}`;
    } else {
        // e.g., "2.5 days (First day is half-day)"
        return `${totalDuration} ${dayString} (${details.join(', ')})`;
    }
};


export default function LeaveRequest({
    leaveRequest,
    history,
    attachments // NEW: Accept attachments prop
}: {
    leaveRequest: LeaveRequestType,
    history: StatusHistoryType[],
    attachments: AttachmentType[] // NEW
}) {
    const router = useRouter();

    const today = startOfDay(new Date());

    const startDate = parseISO(leaveRequest.start_date);

    // FIXED: Use snake_case
    const canRevoke =
        leaveRequest.latest_status === "Approved" &&
        startDate > today;

    const [open, setOpen] = useState(false);
    const [revokeReason, setRevokeReason] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setRevokeReason(""); // Reset reason on close
    };

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
                            // FIXED: Use employeeAvatarUrl
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
                        <Typography variant="h5" sx={{ marginLeft: "25px" }}>Request Information ID: {leaveRequest.request_id}</Typography>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                            <Detail label="Employee" text={
                                `${leaveRequest.employee_first_name} ${leaveRequest.employee_last_name}`
                            } />
                            <Detail label="Leave Type" text={leaveRequest.leave_type} />
                        </Box>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                            <Detail label="Start Date" text={leaveRequest.start_date} />
                            <Detail label="End Date" text={leaveRequest.end_date} />
                        </Box>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                            {/* NEW: Use the smart formatDurationDetails function */}
                            <Detail label="Duration" text={formatDurationDetails(leaveRequest)} />
                            <Detail label="Status" text={leaveRequest.latest_status} />
                        </Box>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                            {/* FIXED: Use snake_case (reason was already correct) */}
                            <Detail label="Reason" text={leaveRequest.reason || "N/A"} />
                        </Box>

                        {/* FIXED: Use snake_case */}
                        {leaveRequest.latest_status === "Rejected" && (
                            <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                                <Detail label="Supervisor's Reason" text={leaveRequest.reject_reason || "N/A"} />
                            </Box>
                        )}

                        {/* === NEW ATTACHMENT SECTION === */}
                        {attachments && attachments.length > 0 && (
                            <Box sx={{ paddingLeft: "30px", my: "20px" }}>
                                <Typography variant="h6" gutterBottom>Attachments</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {attachments.map((file) => (
                                        <Button
                                            key={file.attachment_id}
                                            component="a" // Makes the button a link
                                            href={file.url}      // The URL from your mock data
                                            target="_blank"     // Opens in a new tab
                                            rel="noopener noreferrer" // Security best practice
                                            variant="outlined"
                                            startIcon={<ArticleOutlinedIcon />}
                                            sx={{
                                                textTransform: 'none', // Keeps file name capitalization
                                                justifyContent: 'flex-start'
                                            }}
                                        >
                                            {file.name}
                                        </Button>
                                    ))}
                                </Box>
                            </Box>
                        )}
                        {/* === END OF ATTACHMENT SECTION === */}


                        {/* === DIALOG CODE (already correct) === */}
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
                                onClose={handleClose}
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Confirm Request Revocation"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description" sx={{ mb: 2 }}>
                                        Are you sure you want to revoke this approved leave request? Please provide a reason below.
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="reason"
                                        name="reason"
                                        label="Reason for Revocation"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        value={revokeReason}
                                        onChange={(e) => setRevokeReason(e.target.value)}
                                        multiline
                                        rows={3}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button
                                        onClick={handleRevokeSubmit}
                                        color="warning"
                                        disabled={!revokeReason}
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

