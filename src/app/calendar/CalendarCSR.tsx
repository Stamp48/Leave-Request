'use client';
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CalendarUI } from "@/components/ui/calendar";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import LeaveTable from "../components/LeaveComp/LeaveTable";
import { LeaveRequestType } from "../lib/mockDataLeaveRequest";
import { filterRequestsByRange } from "@/app/lib/utils"

export default function Calendar({ initialRows }: { initialRows: LeaveRequestType[] }) {

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: new Date()
    });
    const filteredRows = React.useMemo(() => {
        return filterRequestsByRange(initialRows, date);
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

                <Typography variant="body1" color="white" sx={{ mt: 2, p: 1, bgcolor: '#2E8EE4', borderRadius: 1 }}>
                    Selected range: {" "}
                    {date?.from ? format(date.from, "PPP") : "Start Date"} -{" "}
                    {date?.to ? format(date.to, "PPP") : "End Date"}
                </Typography>
            </Box>

            <Box sx={{ flex: 1, flexDirection: "column", display: "flex", alignItems: "start", justifyContent: "center", paddingX: "3rem", paddingY: "1rem" }}>
                <Typography variant="h4" color="white" sx={{ paddingBottom: "1rem" }}>
                    Approved Leave Requests
                </Typography>
                <LeaveTable rows={filteredRows} />
            </Box>
        </Box>
    );
}