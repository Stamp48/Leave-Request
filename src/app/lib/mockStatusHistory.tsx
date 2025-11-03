import { LeaveStatus } from "./mockDataLeaveRequest";

export interface StatusHistoryType {
  request_id: number;
  employee_id: number; // ID of the employee *making the update*
  // FIXED: Added 'Revoked'
  status: LeaveStatus;
  timestamp: string; // ISO 8601 format
}

/**
 * Mock data for status history.
 * - ADDED: History for 23 new requests (IDs 18-40).
 * - Includes 'Modified' and 'Canceled' examples.
 */
export const mockStatusHistory: StatusHistoryType[] = [
  // Request 1: Leo (id: 12) -> Approved by Bob (id: 2)
  { request_id: 1, employee_id: 12, status: 'Pending', timestamp: '2025-08-20T09:00:00Z' },
  { request_id: 1, employee_id: 2, status: 'Approved', timestamp: '2025-08-21T11:30:00Z' },

  // Request 2: Oscar (id: 15) -> Approved by Bob (id: 2)
  { request_id: 2, employee_id: 15, status: 'Pending', timestamp: '2025-09-04T08:15:00Z' },
  { request_id: 2, employee_id: 2, status: 'Approved', timestamp: '2025-09-04T08:30:00Z' },

  // Request 3: Karen (id: 11) -> Pending
  { request_id: 3, employee_id: 11, status: 'Pending', timestamp: '2025-09-05T14:20:00Z' },

  // Request 4: Charlie (id: 3) -> Approved by Nina (id: 14)
  { request_id: 4, employee_id: 3, status: 'Pending', timestamp: '2025-09-06T10:00:00Z' },
  { request_id: 4, employee_id: 14, status: 'Approved', timestamp: '2025-09-06T16:05:00Z' },

  // Request 5: Leo (id: 12) -> Pending
  { request_id: 5, employee_id: 12, status: 'Pending', timestamp: '2025-09-16T18:00:00Z' },

  // Request 6: Nina (id: 14) -> Rejected by Alice (id: 1)
  { request_id: 6, employee_id: 14, status: 'Pending', timestamp: '2025-09-10T11:00:00Z' },
  { request_id: 6, employee_id: 1, status: 'Rejected', timestamp: '2025-09-11T15:30:00Z' },

  // Request 7: Karen (id: 11) -> Approved by Alice (id: 1)
  { request_id: 7, employee_id: 11, status: 'Pending', timestamp: '2025-09-12T09:30:00Z' },
  { request_id: 7, employee_id: 1, status: 'Approved', timestamp: '2025-09-13T10:15:00Z' },

  // Request 8: Oscar (id: 15) -> Approved by Bob (id: 2)
  { request_id: 8, employee_id: 15, status: 'Pending', timestamp: '2025-10-05T13:00:00Z' },
  { request_id: 8, employee_id: 2, status: 'Approved', timestamp: '2025-10-05T13:10:00Z' },

  // Request 9: Mona (id: 13) -> Pending
  { request_id: 9, employee_id: 13, status: 'Pending', timestamp: '2025-10-08T16:45:00Z' },

  // Request 10: Leo (id: 12) -> Approved by Bob (id: 2)
  { request_id: 10, employee_id: 12, status: 'Pending', timestamp: '2025-10-10T10:00:00Z' },
  { request_id: 10, employee_id: 2, status: 'Approved', timestamp: '2025-10-11T14:20:00Z' },

  // Request 11: Jack (id: 10) -> Approved by Alice (id: 1)
  { request_id: 11, employee_id: 10, status: 'Pending', timestamp: '2025-08-02T11:00:00Z' },
  { request_id: 11, employee_id: 1, status: 'Approved', timestamp: '2025-08-02T15:00:00Z' },

  // Request 12: David (id: 4) -> Rejected by Jack (id: 10)
  { request_id: 12, employee_id: 4, status: 'Pending', timestamp: '2025-08-05T09:12:00Z' },
  { request_id: 12, employee_id: 10, status: 'Rejected', timestamp: '2025-08-05T17:00:00Z' },

  // Request 13: Charlie (id: 3) -> Approved by Nina (id: 14)
  { request_id: 13, employee_id: 3, status: 'Pending', timestamp: '2025-08-10T14:30:00Z' },
  { request_id: 13, employee_id: 14, status: 'Approved', timestamp: '2025-08-11T09:00:00Z' },

  // Request 14: Oscar (id: 15) -> Approved by Bob (id: 2)
  { request_id: 14, employee_id: 15, status: 'Pending', timestamp: '2025-08-15T11:00:00Z' },
  { request_id: 14, employee_id: 2, status: 'Approved', timestamp: '2025-08-15T11:05:00Z' },

  // Request 15: Bob (id: 2) -> Pending
  { request_id: 15, employee_id: 2, status: 'Pending', timestamp: '2025-07-01T22:00:00Z' },

  // Request 16: Eva (id: 5) -> Canceled by self
  { request_id: 16, employee_id: 5, status: 'Pending', timestamp: '2025-11-01T15:00:00Z' },
  { request_id: 16, employee_id: 5, status: 'Canceled', timestamp: '2025-11-02T10:00:00Z' },

  // Request 17: Hannah (id: 8) -> Modified by self (still Pending)
  { request_id: 17, employee_id: 8, status: 'Pending', timestamp: '2025-11-04T16:00:00Z' },
  { request_id: 17, employee_id: 8, status: 'Modified', timestamp: '2025-11-05T11:00:00Z' },

  // --- NEW HISTORY FOR REQUESTS 18-40 ---

  // Request 18: Grace (id: 7) -> Pending
  { request_id: 18, employee_id: 7, status: 'Pending', timestamp: '2025-11-06T09:00:00Z' },

  // Request 19: David (id: 4) -> Approved by Jack (id: 10)
  { request_id: 19, employee_id: 4, status: 'Pending', timestamp: '2025-11-06T10:00:00Z' },
  { request_id: 19, employee_id: 10, status: 'Approved', timestamp: '2025-11-06T10:05:00Z' },

  // Request 20: Ian (id: 9) -> Rejected by Bob (id: 2)
  { request_id: 20, employee_id: 9, status: 'Pending', timestamp: '2025-11-07T09:30:00Z' },
  { request_id: 20, employee_id: 2, status: 'Rejected', timestamp: '2025-11-07T14:00:00Z' },

  // Request 21: Mona (id: 13) -> Canceled by self
  { request_id: 21, employee_id: 13, status: 'Pending', timestamp: '2025-11-08T10:00:00Z' },
  { request_id: 21, employee_id: 13, status: 'Canceled', timestamp: '2025-11-08T11:00:00Z' },

  // Request 22: Charlie (id: 3) -> Pending
  { request_id: 22, employee_id: 3, status: 'Pending', timestamp: '2025-11-08T15:30:00Z' },

  // Request 23: Eva (id: 5) -> Pending
  { request_id: 23, employee_id: 5, status: 'Pending', timestamp: '2025-11-09T08:00:00Z' },

  // Request 24: Frank (id: 6) -> Approved by Alice (id: 1)
  { request_id: 24, employee_id: 6, status: 'Pending', timestamp: '2025-11-09T16:00:00Z' },
  { request_id: 24, employee_id: 1, status: 'Approved', timestamp: '2025-11-09T17:00:00Z' },

  // Request 25: Alice (id: 1) -> Pending
  { request_id: 25, employee_id: 1, status: 'Pending', timestamp: '2025-11-10T09:15:00Z' },

  // Request 26: Bob (id: 2) -> Approved by Alice (id: 1)
  { request_id: 26, employee_id: 2, status: 'Pending', timestamp: '2025-11-10T10:00:00Z' },
  { request_id: 26, employee_id: 1, status: 'Approved', timestamp: '2025-11-10T11:00:00Z' },

  // Request 27: Hannah (id: 8) -> Modified by self
  { request_id: 27, employee_id: 8, status: 'Pending', timestamp: '2025-11-11T09:00:00Z' },
  { request_id: 27, employee_id: 8, status: 'Modified', timestamp: '2025-11-11T13:45:00Z' },

  // Request 28: Leo (id: 12) -> Approved by Bob (id: 2)
  { request_id: 28, employee_id: 12, status: 'Pending', timestamp: '2025-11-12T09:00:00Z' },
  { request_id: 28, employee_id: 2, status: 'Approved', timestamp: '2025-11-12T10:30:00Z' },

  // Request 29: Oscar (id: 15) -> Canceled by self
  { request_id: 29, employee_id: 15, status: 'Pending', timestamp: '2025-11-12T14:00:00Z' },
  { request_id: 29, employee_id: 15, status: 'Canceled', timestamp: '2025-11-12T16:00:00Z' },

  // Request 30: Grace (id: 7) -> Approved by Karen (id: 11)
  { request_id: 30, employee_id: 7, status: 'Pending', timestamp: '2025-11-13T08:55:00Z' },
  { request_id: 30, employee_id: 11, status: 'Approved', timestamp: '2025-11-13T09:00:00Z' },

  // Request 31: David (id: 4) -> Approved by Jack (id: 10)
  { request_id: 31, employee_id: 4, status: 'Pending', timestamp: '2025-11-13T10:00:00Z' },
  { request_id: 31, employee_id: 10, status: 'Approved', timestamp: '2025-11-13T10:20:00Z' },

  // Request 32: Ian (id: 9) -> Pending
  { request_id: 32, employee_id: 9, status: 'Pending', timestamp: '2025-11-13T14:30:00Z' },

  // Request 33: Mona (id: 13) -> Approved by Alice (id: 1)
  { request_id: 33, employee_id: 13, status: 'Pending', timestamp: '2025-11-14T08:00:00Z' },
  { request_id: 33, employee_id: 1, status: 'Approved', timestamp: '2025-11-14T08:30:00Z' },

  // Request 34: Charlie (id: 3) -> Rejected by Nina (id: 14)
  { request_id: 34, employee_id: 3, status: 'Pending', timestamp: '2025-11-14T10:00:00Z' },
  { request_id: 34, employee_id: 14, status: 'Rejected', timestamp: '2025-11-14T11:00:00Z' },

  // Request 35: Eva (id: 5) -> Approved by Bob (id: 2)
  { request_id: 35, employee_id: 5, status: 'Pending', timestamp: '2025-11-15T09:00:00Z' },
  { request_id: 35, employee_id: 2, status: 'Approved', timestamp: '2025-11-15T10:00:00Z' },

  // Request 36: Jack (id: 10) -> Pending
  { request_id: 36, employee_id: 10, status: 'Pending', timestamp: '2025-11-15T13:00:00Z' },

  // Request 37: Karen (id: 11) -> Approved by Alice (id: 1)
  { request_id: 37, employee_id: 11, status: 'Pending', timestamp: '2025-11-16T10:00:00Z' },
  { request_id: 37, employee_id: 1, status: 'Approved', timestamp: '2025-11-16T11:00:00Z' },

  // Request 38: Nina (id: 14) -> Pending
  { request_id: 38, employee_id: 14, status: 'Pending', timestamp: '2025-11-17T08:00:00Z' },

  // Request 39: Alice (id: 1) -> Approved by Bob (id: 2)
  { request_id: 39, employee_id: 1, status: 'Pending', timestamp: '2025-11-17T09:30:00Z' },
  { request_id: 39, employee_id: 2, status: 'Approved', timestamp: '2025-11-17T10:00:00Z' },

  // Request 40: Bob (id: 2) -> Pending
  { request_id: 40, employee_id: 2, status: 'Pending', timestamp: '2025-11-18T22:00:00Z' },
];

