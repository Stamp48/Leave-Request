// 1. Import the REAL UI type from your /types folder
import type { LeaveRequest } from "@/types/leaveRequest";
import LeaveRequests from "./LeaveRequestsCSR";

// 2. This sorting function stays on the server
function sortRequests(requests: LeaveRequest[], order: 'newest' | 'oldest' = 'newest') {
  return [...requests].sort((a, b) => {
    // 3. Use the camelCase 'latestTimestamp' from your UI type
    const timeA = new Date(a.latestTimestamp).getTime();
    const timeB = new Date(b.latestTimestamp).getTime();
    return order === 'newest' ? timeB - timeA : timeA - timeB;
  });
}

export default async function LeaveRequestsPage(){
  try {
    // 4. Fetch from your Next.js API route
    // (Using APP_ORIGIN is good practice for server fetches)
    const res = await fetch(`${process.env.APP_ORIGIN}/api/leave-requests`, { 
      cache: "no-store" 
    });

    if (!res.ok) {
      console.error("Fetch failed:", res.status, await res.text());
      throw new Error("Failed to fetch leave requests");
    }

    // 5. Get the clean, camelCase data
    const data : LeaveRequest[] = await res.json();

    // 6. Sort the real data
    const sortedRequests = sortRequests(data, 'newest');

    return <LeaveRequests initialRows={sortedRequests} />; 

  } catch (err) {
    console.error("Fetch error:", err);
    // You might want a real error component here
    return <div>Error loading leave requests.</div>;
  }
}