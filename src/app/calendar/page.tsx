import Calendar from "./CalendarCSR"
// 1. Import the REAL UI type
import { LeaveRequest } from "@/types/leaveRequest";
import Typography from "@mui/material/Typography";

export default async function CalendarPage(){
    try {
        // 2. Fetch from your Next.js API route
        const res = await fetch(`${process.env.APP_ORIGIN}/api/leave-requests`, { 
            cache: "no-store" 
        });

        if (!res.ok) {
            console.error("Fetch failed:", res.status, await res.text());
            throw new Error("Failed to fetch leave requests");
        }
        
        // 3. Get the clean, camelCase data
        const data : LeaveRequest[] = await res.json();
        
        // 4. Pass the real data to the client component
        return <Calendar initialRows={data} />; 

    } catch (err) {
        console.error("Fetch error:", err);
        // Fallback to an empty array on error
        return <Typography>Error loading calendar data.</Typography>;
    }
}