import Employee from "./EmployeeCSR";
import { mockStatusHistory, StatusHistoryType } from "@/app/lib/mockStatusHistory";
import type { EmployeeWithNames } from "@/types/employeeWithNames";


export default async function EmployeePage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [empRes, listRes] = await Promise.all([
    fetch(`${process.env.APP_ORIGIN}/api/employee/${params.id}`, { cache: "no-store" }),
    fetch(`${process.env.APP_ORIGIN}/api/employees/with-names`, { cache: "no-store" }),
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

  // 🔹 แปลง JSON พร้อมกัน
  const [employee, employees]: [EmployeeWithNames, EmployeeWithNames[]] =
    await Promise.all([empRes.json(), listRes.json()]);

  if (!employee) return <h1>Employee not found</h1>;

  const supervisor = employee.supervisorID
    ? employees.find(e => e.employeeID === employee.supervisorID)
    : null;

  const isSupervisor = employees.some(e => e.supervisorID === employee.employeeID);

  // --- Filter and Sort Leave History ---

  // STEP 1: Find all *originating* requests for this employee.
  // We MUST filter for 'Pending' here, as it's the only way to know
  // this employee *started* the request.
  const originatingRequests = mockStatusHistory.filter(
    item => item.employee_id === employee.employeeID && item.status === 'Pending'
  );

  // STEP 2: Sort these originating requests by date to find the newest ones.
  originatingRequests.sort((a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // STEP 3: Get the 5 most recent request IDs
  const latest5RequestIds = originatingRequests
    .slice(0, 5)
    .map(req => req.request_id);

  // STEP 4: Get the *full history* (all statuses) for those 5 IDs.
  // Notice this filter does NOT check for 'Pending'.
  const leavHistList = mockStatusHistory
    .filter(item => latest5RequestIds.includes(item.request_id))
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