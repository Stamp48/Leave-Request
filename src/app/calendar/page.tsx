import Calendar from "./CalendarCSR"
import { mockLeaveRequests } from "../lib/mockDataLeaveRequest"

export default function CalendarPage(){
    return <Calendar initialRows={mockLeaveRequests}/>
}