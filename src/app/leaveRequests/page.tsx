import { LeaveRequestType } from "@/app/lib/mockDataLeaveRequest";
import { mockLeaveRequests } from "@/app/lib/mockDataLeaveRequest";
import LeaveRequests from "./LeaveRequestsCSR";

export default async function LeaveRequestsPage(){
    try {
        // todo: change url
    const res = await fetch("http://localhost:8080/api/division/8", { cache: "no-store" });
    if (!res.ok) {
      console.error("Fetch failed:", res.status, await res.text());
      return <LeaveRequests initialRows={mockLeaveRequests} />;
    }
    const data : LeaveRequestType[] = await res.json();
    console.log(data);
    // ensure data shape matches LeaveRequestType[]
    return <LeaveRequests initialRows={mockLeaveRequests} />; // todo: change mockLeaveRequests to data
  } catch (err) {
    console.error("Fetch error:", err);
    return <LeaveRequests initialRows={mockLeaveRequests} />;
  }
}