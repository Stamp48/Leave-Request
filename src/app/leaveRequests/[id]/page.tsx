import type { LeaveRequest } from "@/types/leaveRequest";
import type { StatusHistory } from "@/types/statusHistory";
import type { Attachment } from "@/types/attachment";

import LeaveRequestDetail from "./LeaveRequestCSR";
import { notFound } from "next/navigation";
import { Typography } from "@mui/material";

// --- fetch helpers (เขียนให้ชัด ๆ และเรียก path ที่มีอยู่จริง) ---
// src/app/leaveRequests/[id]/page.tsx
const ORIGIN = process.env.NEXT_PUBLIC_APP_ORIGIN || process.env.APP_ORIGIN || "";

async function getLeaveRequest(id: string) {
  const res = await fetch(`${ORIGIN}/api/leave-requests/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

async function getRequestHistory(id: string) {
  const res = await fetch(`${ORIGIN}/api/status-history/${id}`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ) : [];
}

async function getRequestAttachments(id: string) {
  const res = await fetch(`${ORIGIN}/api/attachment/leave-requests/${id}`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}


// --- page component (อย่าใช้ Promise สำหรับ params ใน page) ---
export default async function LeaveRequestDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const requestId = params.id; // ✅ ไม่ต้อง await

  try {
    const [leaveRequest, history, attachments] = await Promise.all([
      getLeaveRequest(requestId),
      getRequestHistory(requestId),
      getRequestAttachments(requestId),
    ]);

    if (!leaveRequest) {
      notFound(); // ✅ ถ้าไม่เจอ จะไปหน้า 404 ของ Next
    }

    return (
      <LeaveRequestDetail
        leaveRequest={leaveRequest as LeaveRequest}
        history={history}
        attachments={attachments}
      />
    );
  } catch (error) {
    console.error("Failed to fetch leave request details:", error);
    return <Typography>Error loading leave request.</Typography>;
  }
}
