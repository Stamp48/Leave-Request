'use client';
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CalendarUI } from "@/components/ui/calendar";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import LeaveTable from "../components/LeaveComp/LeaveTable";
// 1. Import the REAL UI type
import { LeaveRequest } from "@/types/leaveRequest";
import { filterRequestsByRange } from "@/app/lib/utils"

// 2. Use the REAL UI type here
export default function Calendar({ initialRows }: { initialRows: LeaveRequest[] }) {

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: new Date()
    });

    // 3. This useMemo hook now works correctly because:
    //    - 'initialRows' is LeaveRequest[]
    //    - 'filterRequestsByRange' is updated to also use LeaveRequest[]
    const filteredRows = React.useMemo(() => {
        // Only show 'Approved' requests on the calendar
        const approvedRows = initialRows.filter(row => row.latestStatus === 'อนุมัติ');
        return filterRequestsByRange(approvedRows, date);
    }, [initialRows, date]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", marginBottom: "100px" }}>
            <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                <Typography variant="h3" color="primary.main">
                    Team Leave
                </Typography>
            </Box>

            <Box sx={{
                flex: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingTop: "2rem",
            }}>
                <CalendarUI
                    mode="range"
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                    showOutsideDays={false}
                    className="rounded-lg border"
                />

                {/* This is your custom UI change */}
                <Typography variant="body1" color="white" sx={{ mt: 2, p: 1, bgcolor: '#2E8EE4', borderRadius: 1 }}>
                    Selected range: {" "}
                    {date?.from ? format(date.from, "PPP") : "Start Date"} -{" "}
                    {date?.to ? format(date.to, "PPP") : "End Date"}
                </Typography>
            </Box>

            <Box sx={{ flex: 1, flexDirection: "column", display: "flex", alignItems: "start", justifyContent: "center", paddingX: "3rem", paddingY: "1rem" }}>
                {/* This is your custom UI change */}
                <Typography variant="h4" color="primary.main" sx={{ paddingBottom: "1rem" }}>
                    Approved Leave Requests
                </Typography>
                {/* 4. LeaveTable is already updated to use camelCase, so this works */}
                <LeaveTable rows={filteredRows} />
            </Box>
        </Box>
    );
}