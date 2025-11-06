import type { LeaveRequest } from "@/types/leaveRequest";
import type { StatusHistory } from "@/types/statusHistory";
import type { Attachment } from "@/types/attachment";

import LeaveRequestDetail from "./LeaveRequestCSR"; // 2. This is the client component
import { notFound } from "next/navigation";
import { Typography } from "@mui/material";

// --- Helper Functions to Fetch Data ---

async function getLeaveRequest(id: string): Promise<LeaveRequest | null> {
  const res = await fetch(`${process.env.APP_ORIGIN}/api/leave-requests/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

async function getRequestHistory(id: string): Promise<StatusHistory[]> {
  const res = await fetch(`${process.env.APP_ORIGIN}/api/status-history/${id}`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  // Sort by most recent update first
  return data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

async function getRequestAttachments(id: string) {
  const res = await fetch(`${process.env.APP_ORIGIN}/api/attachment/leave-requests/${id}`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json(); // Attachment[]
}

// --- End Helper Functions ---


export default async function LeaveRequestDetailPage({ params }: { params: { "request-id": string } }) {
  
  const requestId = params["request-id"]; // This is a string, e.g., "5"

  try {
    // --- Fetch all data in parallel ---
    const [leaveRequest, history, attachments] = await Promise.all([
      getLeaveRequest(requestId),
      getRequestHistory(requestId),
      getRequestAttachments(requestId)
    ]);

    // Handle case where request isn't found
    if (!leaveRequest) {
      notFound();
    }
    
    // 4. Pass all three clean, camelCase props to your client component
    return (
      <LeaveRequestDetail 
        leaveRequest={leaveRequest} 
        history={history} 
        attachments={attachments} 
      />
    );
  } catch (error) {
    console.error("Failed to fetch leave request details:", error);
    return <Typography>Error loading leave request.</Typography>
  }
}