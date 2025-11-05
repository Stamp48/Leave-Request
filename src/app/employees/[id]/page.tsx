import { LeaveRequest } from "@/types/leaveRequest";
import Employee from "./EmployeeCSR";
import type { EmployeeWithNames } from "@/types/employeeWithNames";


export default async function EmployeePage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [empRes, listRes, lqRes] = await Promise.all([
    fetch(`${process.env.APP_ORIGIN}/api/employee/${params.id}`, { cache: "no-store" }),
    fetch(`${process.env.APP_ORIGIN}/api/employees/with-names`, { cache: "no-store" }),
    fetch(`${process.env.APP_ORIGIN}/api/leave-requests`, { cache: "no-store" }),
  ]);

  // 🔹 เช็ก error ทีละตัว (กัน HTML error page แตกตอน res.json())
  if (!empRes.ok) {
    if (empRes.status === 404) return <h1>Employee not found</h1>;
    const txt = await empRes.text();
    throw new Error(`GET /api/employee/${params.id} ${empRes.status}: ${txt.slice(0,200)}`);
  }
  if (!listRes.ok) {
    const txt = await listRes.text();
    throw new Error(`GET /api/employees/with-names ${listRes.status}: ${txt.slice(0,200)}`);
  }

  if (!lqRes.ok) {
    const txt = await lqRes.text();
    throw new Error(`GET /api/leaveRequestsHR${lqRes.status}: ${txt.slice(0,200)}`);
  }

  // 🔹 แปลง JSON พร้อมกัน
  const [employee, employees, leaveRequests]: [EmployeeWithNames, EmployeeWithNames[], LeaveRequest[]] =
    await Promise.all([empRes.json(), listRes.json(), lqRes.json()]);

  if (!employee) return <h1>Employee not found</h1>;

  const supervisor = employee.supervisorID
    ? employees.find(e => e.employeeID === employee.supervisorID)
    : null;

  const isSupervisor = employees.some(e => e.supervisorID === employee.employeeID);

  // --- Filter and Sort Leave History ---

  // STEP 1: Find all *originating* requests for this employee.
  // We MUST filter for 'Pending' here, as it's the only way to know
  // this employee *started* the request.
  const originatingRequests = leaveRequests.filter(
    item => item.employeeID === employee.employeeID 
  );

  // STEP 2: Sort these originating requests by date to find the newest ones.
  originatingRequests.sort((a, b) =>
    new Date(b.latestTimestamp).getTime() - new Date(a.latestTimestamp).getTime()
  );

  // STEP 3: Get the 5 most recent request IDs
  const latest5RequestIds = originatingRequests
    .slice(0, 5)
    .map(req => req.requestID);

  // STEP 4: Get the *full history* (all statuses) for those 5 IDs.
  // Notice this filter does NOT check for 'Pending'.
  const leaveRequestsList = leaveRequests 
    .filter(item => latest5RequestIds.includes(item.requestID))
    .sort((a, b) =>
      new Date(b.latestTimestamp).getTime() - new Date(a.latestTimestamp).getTime()
    );

  // --- End of Logic ---

  console.log("Filtered History (All Statuses for Latest 5):", leaveRequestsList);

  return (
    <Employee
      employee={employee}
      supervisor={supervisor ?? undefined}
      isSupervisor={isSupervisor}
      leaveHistory={leaveRequestsList} // This list contains all statuses
    />
  );
}