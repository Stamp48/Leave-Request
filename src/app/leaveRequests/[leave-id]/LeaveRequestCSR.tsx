'use client';
// 1. Import REAL UI types
import { LeaveRequest } from "@/types/leaveRequest";
import { StatusHistory } from "@/types/statusHistory";
import { Attachment } from "@/types/attachment";

import { Box, Button, Card, CardContent, CardHeader, Typography, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Detail from "@/app/components/Detail";
import { calculateLeaveDuration } from "@/app/lib/utils"; // This util is now camelCase
import { useRouter } from "next/navigation";
import { parseISO, startOfDay } from "date-fns";
// 2. Import useTransition
import { useState, useTransition } from "react";
import LeaveHistory from "@/app/components/LeaveComp/LeaveHistory";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from "react";


/**
 * Helper function to provide detailed duration text.
 * This reads the camelCase booleans.
 */
const formatDurationDetails = (request: LeaveRequest): string => {
    // 3. This util function is now updated to use camelCase
    const totalDuration = calculateLeaveDuration(request);
    let details: string[] = [];

    // FIXED: Use camelCase
    if (request.isHalfDay) {
        details.push(request.isMorning ? "Half Day (Morning)" : "Half Day (Afternoon)");
    } else {
        if (request.isFirstHalfDay) {
            details.push("First day is half-day");
        }
        if (request.isLastHalfDay) {
            details.push("Last day is half-day");
        }
    }

    const dayString = totalDuration === 1 ? "day" : "days";
    if (details.length === 0) {
        return `${totalDuration} ${dayString}`;
    } else {
        return `${totalDuration} ${dayString} (${details.join(', ')})`;
    }
};


export default function LeaveRequestDetail({ 
  leaveRequest, 
  history, 
  attachments
}: { 
  leaveRequest: LeaveRequest, 
  history: StatusHistory[],
  attachments: Attachment[] 
}) {
    const router = useRouter();
    const today = startOfDay(new Date());
    
    // 4. Use useTransition for loading state
    const [isPending, startTransition] = useTransition();

    // FIXED: startDate is already a Date object
    const startDate = startOfDay(leaveRequest.startDate); 

    // FIXED: Use camelCase
    const canRevoke =
        leaveRequest.latestStatus === "อนุมัติ" &&
        startDate > today;

    const [open, setOpen] = useState(false);
    const [revokeReason, setRevokeReason] = useState("");

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setRevokeReason(""); 
    };

    // 5. IMPLEMENTED: handleRevokeSubmit
    const handleRevokeSubmit = async () => {
  startTransition(async () => {
    try {
      const res = await fetch(`/api/leave-requests/${leaveRequest.requestID}/revoke`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: revokeReason })
      });

      if (!res.ok) throw new Error(await res.text());
      handleClose();
      router.refresh();
    } catch (e) {
      console.error("Revoke failed:", e);
    }
  });
};


    return (

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, padding: 4, backgroundColor: "#1976d2", borderRadius: "25px" }}>
            <Typography variant="h3" color="white">
                Leave Request Detail
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "7fr 3fr", gap: 2 }}>
                <Card sx={{ flexGrow: 1, boxShadow: 3, borderRadius: 2 }}>
                    <CardHeader
                        // FIXED: Use camelCase
                        onClick={() => router.push(`/employees/${leaveRequest.employeeID}`)}
                        avatar={<Avatar alt={`${leaveRequest.employeeFirstName} ${leaveRequest.employeeLastName}`}
                            // FIXED: Use camelCase
                            src={leaveRequest.employeeProfile || undefined} // Use undefined for null
                            sx={{ width: 150, height: 150, marginTop: "20px", marginLeft: "20px", marginRight: "15px" }}
                        />
                        }
                        // FIXED: Use camelCase
                        title={<Typography variant="h4">{leaveRequest.employeeFirstName} {leaveRequest.employeeLastName}</Typography>}
                        subheader={
                            <Box>
                                {/* FIXED: Use camelCase */}
                                <Typography variant="subtitle1">{leaveRequest.employeePosition}</Typography>
                                <Typography variant="subtitle2">Employee ID: {leaveRequest.employeeID}</Typography>
                            </Box>
                        }
                    />
                    <CardContent>
                        {/* FIXED: Use camelCase */}
                        <Typography variant="h5" sx={{ marginLeft: "25px" }}>Request Information ID: {leaveRequest.requestID}</Typography>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                            <Detail label="Employee" text={
                                `${leaveRequest.employeeFirstName} ${leaveRequest.employeeLastName}`
                            } />
                            <Detail label="Leave Type" text={leaveRequest.leaveType} />
                        </Box>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                            {/* FIXED: Format Date objects */}
                            <Detail label="Start Date" text={new Date(leaveRequest.startDate).toLocaleDateString()} />
                            <Detail label="End Date" text={new Date(leaveRequest.endDate).toLocaleDateString()} />
                        </Box>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                            <Detail label="Duration" text={formatDurationDetails(leaveRequest)} />
                            <Detail label="Status" text={leaveRequest.latestStatus} />
                        </Box>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                            <Detail label="Reason" text={leaveRequest.reason || "N/A"} />
                        </Box>

                        {/* FIXED: Use camelCase */}
                        {leaveRequest.latestStatus === "ปฏิเสธ" && (
                            <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                                <Detail label="Supervisor's Reason" text={leaveRequest.rejectReason || "N/A"} />
                            </Box>
                        )}

                        {/* === ATTACHMENT SECTION (FIXED) === */}
                        {attachments && attachments.length > 0 && (
                          <Box sx={{ paddingLeft: "30px", my: "20px" }}>
                            <Typography variant="h6" gutterBottom>Attachments</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {attachments.map((file) => (
                                <Button
                                  key={file.attachmentID} // FIXED: Use camelCase
                                  component="a" 
                                  href={file.url}      
                                  target="_blank"     
                                  rel="noopener noreferrer"
                                  variant="outlined"
                                  startIcon={<ArticleOutlinedIcon />}
                                  sx={{ textTransform: 'none', justifyContent: 'flex-start' }}
                                >
                                  {file.name}
                                </Button>
                              ))}
                            </Box>
                          </Box>
                        )}
                        {/* === END OF ATTACHMENT SECTION === */}


                        {/* === DIALOG CODE (UPDATED) === */}
                        <React.Fragment>
                            {canRevoke && (
                                <Box sx={{ paddingLeft: "30px", my: "20px" }}>
                                    <Button variant="contained" color="warning" onClick={handleClickOpen} disabled={isPending}>
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
                                        disabled={isPending} // Disable field while submitting
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} disabled={isPending}>Cancel</Button>
                                    <Button
                                        onClick={handleRevokeSubmit}
                                        color="warning"
                                        // Disable if no reason OR if pending
                                        disabled={!revokeReason || isPending} 
                                    >
                                        {isPending ? "Revoking..." : "Revoke"}
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                        {/* === END OF DIALOG CODE === */}

                    </CardContent>
                </Card>
                {/* This component also needs to be updated */}
                <LeaveHistory history={history} />
            </Box>
        </Box>
    );
}