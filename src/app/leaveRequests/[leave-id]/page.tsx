import { mockLeaveRequests } from "@/app/lib/mockDataLeaveRequest";
import LeaveRequest from "./LeaveRequestCSR";
// 1. Import the status history and its type
import { mockStatusHistory, StatusHistoryType } from "@/app/lib/mockStatusHistory";

export default function LeaveRequestPage({ params }: { params: { "leave-id": string } }) {
    const leaveId = params["leave-id"];
    const leaveRequest = mockLeaveRequests.find(lr => lr.requestId.toString() === leaveId);

    if (!leaveRequest) return <h1>Leave Request not found</h1>;

    // 2. Filter the history list for this specific request ID
    const requestHistory = mockStatusHistory
        .filter(item => item.requestId.toString() === leaveId)
        .sort((a, b) => 
            // Sort by most recent update first
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

    // 3. Pass the new 'history' prop
    return <LeaveRequest leaveRequest={leaveRequest} history={requestHistory} />;
}