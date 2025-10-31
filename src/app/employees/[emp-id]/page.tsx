import Employee from "./EmployeeCSR";
import { mockEmployees } from "@/app/lib/mockDataEmp";
import { mockStatusHistory, StatusHistoryType } from "@/app/lib/mockStatusHistory";

export default function EmployeePage({ params }: { params: { "emp-id": string } }) {
  const employee = mockEmployees.find(e => e.id.toString() === params["emp-id"]);

  if (!employee) return <h1>Employee not found</h1>;

  const supervisor = employee.supervisorId 
    ? mockEmployees.find(e => e.id === employee.supervisorId) 
    : null;
  
  const isSupervisor = mockEmployees.some(e => e.supervisorId === employee.id);

  // --- Filter and Sort Leave History ---

  // STEP 1: Find all *originating* requests for this employee.
  // We MUST filter for 'Pending' here, as it's the only way to know
  // this employee *started* the request.
  const originatingRequests = mockStatusHistory.filter(
    item => item.employeeId === employee.id && item.status === 'Pending'
  );

  // STEP 2: Sort these originating requests by date to find the newest ones.
  originatingRequests.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // STEP 3: Get the 5 most recent request IDs
  const latest5RequestIds = originatingRequests
    .slice(0, 5)
    .map(req => req.requestId);

  // STEP 4: Get the *full history* (all statuses) for those 5 IDs.
  // Notice this filter does NOT check for 'Pending'.
  const leavHistList = mockStatusHistory
    .filter(item => latest5RequestIds.includes(item.requestId))
    .sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

  // --- End of Logic ---

  console.log("Filtered History (All Statuses for Latest 5):", leavHistList);

  return (
    <Employee 
      employee={employee} 
      supervisor={supervisor ?? undefined} 
      isSupervisor={isSupervisor} 
      leaveHistory={leavHistList} // This list contains all statuses
    />
  );
}