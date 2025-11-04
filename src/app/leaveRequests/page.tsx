// FIXED: Import new snake_case types and data
import { mockLeaveRequests, LeaveRequestType } from "@/app/lib/mockDataLeaveRequest";
import LeaveRequests from "./LeaveRequestsCSR";

// Helper function to sort requests by timestamp
function sortRequests(requests: LeaveRequestType[], order: 'newest' | 'oldest' = 'newest') {
  return [...requests].sort((a, b) => {
    const timeA = new Date(a.latest_timestamp).getTime();
    const timeB = new Date(b.latest_timestamp).getTime();
    return order === 'newest' ? timeB - timeA : timeA - timeB;
  });
}

export default async function LeaveRequestsPage(){
  try {
    // todo: change url
    // const res = await fetch("http://localhost:8080/api/leave-requests", { cache: "no-store" });
    // if (!res.ok) {
    //   console.error("Fetch failed:", res.status, await res.text());
    //   throw new Error("Fetch failed");
    // }
    // const data : LeaveRequestType[] = await res.json();
    
    // As requested, we'll use and sort the mock data
    const sortedMockRequests = sortRequests(mockLeaveRequests, 'newest');
    
    return <LeaveRequests initialRows={sortedMockRequests} />; 
  } catch (err) {
    console.error("Fetch error:", err);
    // Fallback to sorted mock data on error
    const sortedMockRequests = sortRequests(mockLeaveRequests, 'newest');
    return <LeaveRequests initialRows={sortedMockRequests} />;
  }
}
