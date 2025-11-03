// FIXED: Import from your 'camelCase' files
import { mockLeaveRequests } from "@/app/lib/mockDataLeaveRequest";
import LeaveRequest from "./LeaveRequestCSR";
import { mockStatusHistory } from "@/app/lib/mockStatusHistory";
// 1. Import mockAttachments (assuming this is the correct path)
import { mockAttachments } from "@/app/lib/mockAttachment";

export default function LeaveRequestPage({ params }: { params: { "leave-id": string } }) {
    const leaveId = params["leave-id"]; // This is a string, e.g., "5"

    // Find request
    const leaveRequest = mockLeaveRequests.find(lr => lr.request_id.toString() === leaveId);

    if (!leaveRequest) return <h1>Leave Request not found</h1>;

    // Filter history
    const requestHistory = mockStatusHistory
        .filter(item => item.request_id.toString() === leaveId)
        .sort((a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

    // 2. NEW: Filter the attachments list
    const requestAttachments = mockAttachments
        .filter(item => item.request_id.toString() === leaveId);

    // 3. Pass all three props
    return <LeaveRequest
        leaveRequest={leaveRequest}
        history={requestHistory}
        attachments={requestAttachments} // Pass the filtered list
    />;
}
