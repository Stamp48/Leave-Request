export interface StatusHistoryType {
  requestId: number;
  employeeId: number; // ID of the employee *making the update*
  status: 'Pending' | 'Approved' | 'Rejected';
  timestamp: string; // ISO 8601 format
}

export const mockStatusHistory: StatusHistoryType[] = [
  // Request 1: Leo (id: 12) -> Approved by Bob (id: 2)
  { requestId: 1, employeeId: 12, status: 'Pending', timestamp: '2025-08-20T09:00:00Z' }, // Was 2025-10-20
  { requestId: 1, employeeId: 2, status: 'Approved', timestamp: '2025-08-21T11:30:00Z' }, // Was 2025-10-21

  // Request 2: Oscar (id: 15) -> Approved by Bob (id: 2)
  { requestId: 2, employeeId: 15, status: 'Pending', timestamp: '2025-09-04T08:15:00Z' }, // Was 2025-11-04
  { requestId: 2, employeeId: 2, status: 'Approved', timestamp: '2025-09-04T08:30:00Z' }, // Was 2025-11-04

  // Request 3: Karen (id: 11) -> Pending (Manager, self-submitted)
  { requestId: 3, employeeId: 11, status: 'Pending', timestamp: '2025-09-05T14:20:00Z' }, // Was 2025-11-05

  // Request 4: Charlie (id: 3) -> Approved by Nina (id: 14)
  { requestId: 4, employeeId: 3, status: 'Pending', timestamp: '2025-09-06T10:00:00Z' }, // Was 2025-11-06
  { requestId: 4, employeeId: 14, status: 'Approved', timestamp: '2025-09-06T16:05:00Z' }, // Was 2025-11-06

  // Request 5: Leo (id: 12) -> Pending
  { requestId: 5, employeeId: 12, status: 'Pending', timestamp: '2025-09-16T18:00:00Z' }, // Was 2025-11-16

  // Request 6: Nina (id: 14) -> Rejected by Alice (id: 1, HR Manager)
  { requestId: 6, employeeId: 14, status: 'Pending', timestamp: '2025-09-10T11:00:00Z' }, // Was 2025-11-10
  { requestId: 6, employeeId: 1, status: 'Rejected', timestamp: '2025-09-11T15:30:00Z' }, // Was 2025-11-11

  // Request 7: Karen (id: 11) -> Approved (by HR, Alice id: 1)
  { requestId: 7, employeeId: 11, status: 'Pending', timestamp: '2025-09-12T09:30:00Z' }, // Was 2025-11-12
  { requestId: 7, employeeId: 1, status: 'Approved', timestamp: '2025-09-13T10:15:00Z' }, // Was 2025-11-13

  // Request 8: Oscar (id: 15) -> Approved by Bob (id: 2)
  { requestId: 8, employeeId: 15, status: 'Pending', timestamp: '2025-10-05T13:00:00Z' }, // Was 2025-12-05
  { requestId: 8, employeeId: 2, status: 'Approved', timestamp: '2025-10-05T13:10:00Z' }, // Was 2025-12-05
  
  // Request 9: Mona (id: 13) -> Pending
  { requestId: 9, employeeId: 13, status: 'Pending', timestamp: '2025-10-08T16:45:00Z' }, // Was 2025-12-08

  // Request 10: Leo (id: 12) -> Approved by Bob (id: 2)
  { requestId: 10, employeeId: 12, status: 'Pending', timestamp: '2025-10-10T10:00:00Z' }, // Was 2025-12-10
  { requestId: 10, employeeId: 2, status: 'Approved', timestamp: '2025-10-11T14:20:00Z' }, // Was 2025-12-11

  // Request 11: Jack (id: 10) -> Approved (by HR, Alice id: 1)
  { requestId: 11, employeeId: 10, status: 'Pending', timestamp: '2025-08-02T11:00:00Z' }, // Was 2026-01-02
  { requestId: 11, employeeId: 1, status: 'Approved', timestamp: '2025-08-02T15:00:00Z' }, // Was 2026-01-02
  
  // Request 12: David (id: 4) -> Rejected by Jack (id: 10)
  { requestId: 12, employeeId: 4, status: 'Pending', timestamp: '2025-08-05T09:12:00Z' }, // Was 2026-01-05
  { requestId: 12, employeeId: 10, status: 'Rejected', timestamp: '2025-08-05T17:00:00Z' }, // Was 2026-01-05

  // Request 13: Charlie (id: 3) -> Approved by Nina (id: 14)
  { requestId: 13, employeeId: 3, status: 'Pending', timestamp: '2025-08-10T14:30:00Z' }, // Was 2026-01-10
  { requestId: 13, employeeId: 14, status: 'Approved', timestamp: '2025-08-11T09:00:00Z' }, // Was 2026-01-11

  // Request 14: Oscar (id: 15) -> Approved by Bob (id: 2)
  { requestId: 14, employeeId: 15, status: 'Pending', timestamp: '2025-08-15T11:00:00Z' }, // Was 2026-01-15
  { requestId: 14, employeeId: 2, status: 'Approved', timestamp: '2025-08-15T11:05:00Z' }, // Was 2026-01-15

  // Request 15: Bob (id: 2) -> Pending (Manager, self-submitted)
  { requestId: 15, employeeId: 2, status: 'Pending', timestamp: '2025-07-01T22:00:00Z' } // Was 2026-02-01
];