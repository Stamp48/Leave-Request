import Image from "next/image";
import HomePage from "@/app/HomePageCSR"
import { mockEmployees } from "./lib/mockDataEmp";
import { EmployeeType } from "./lib/mockDataEmp"
import { mockLeaveRequests } from "./lib/mockDataLeaveRequest";
import { LeaveRequestType } from "./lib/mockDataLeaveRequest"
import { mockDepartments } from "./lib/mockDataDepDiv";

export default function Home() {
  return (
    <HomePage leaveRequests={mockLeaveRequests} employees={mockEmployees} departments={mockDepartments}/>
  );
  }