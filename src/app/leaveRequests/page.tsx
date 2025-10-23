import { LeaveRequestType } from "@/app/lib/mockDataLeaveRequest";
import { mockLeaveRequests } from "@/app/lib/mockDataLeaveRequest";
import LeaveRequests from "./LeaveRequestsCSR";

export default function LeaveRequestsPage(){
    return <LeaveRequests initialRows={mockLeaveRequests} />
}