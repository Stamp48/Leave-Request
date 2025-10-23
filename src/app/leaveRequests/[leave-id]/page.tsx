import {mockLeaveRequests} from "@/app/lib/mockDataLeaveRequest";
import LeaveRequest from "./LeaveRequestCSR";


export default function LeaveRequestPage( { params }: { params: { "leave-id": string } }) {
    const leaveId = params["leave-id"];
    const leaveRequest = mockLeaveRequests.find(lr => lr.requestId.toString() === leaveId);
    if (!leaveRequest) return <h1>Leave Request not found</h1>;
    return <LeaveRequest leaveRequest={leaveRequest} />;
}