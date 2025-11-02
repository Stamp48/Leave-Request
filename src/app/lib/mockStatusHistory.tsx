export interface StatusHistoryType {
  requestId: number;
  employeeId: number; // ID of the employee *making the update*
  // FIXED: Added 'Revoked'
  status: 'Pending' | 'Approved' | 'Rejected' | 'Canceled' | 'Modified' | 'Revoked';
  timestamp: string; // ISO 8601 format
}

/**
 * Mock data for status history.
 * - ADDED: History for 23 new requests (IDs 18-40).
 * - Includes 'Modified' and 'Canceled' examples.
 */
export const mockStatusHistory: StatusHistoryType[] = [
  // Request 1: Leo (id: 12) -> Approved by Bob (id: 2)
  { requestId: 1, employeeId: 12, status: 'Pending', timestamp: '2025-08-20T09:00:00Z' },
  { requestId: 1, employeeId: 2, status: 'Approved', timestamp: '2025-08-21T11:30:00Z' },

  // Request 2: Oscar (id: 15) -> Approved by Bob (id: 2)
  { requestId: 2, employeeId: 15, status: 'Pending', timestamp: '2025-09-04T08:15:00Z' },
  { requestId: 2, employeeId: 2, status: 'Approved', timestamp: '2025-09-04T08:30:00Z' },

  // Request 3: Karen (id: 11) -> Pending
  { requestId: 3, employeeId: 11, status: 'Pending', timestamp: '2025-09-05T14:20:00Z' },

  // Request 4: Charlie (id: 3) -> Approved by Nina (id: 14)
  { requestId: 4, employeeId: 3, status: 'Pending', timestamp: '2025-09-06T10:00:00Z' },
  { requestId: 4, employeeId: 14, status: 'Approved', timestamp: '2025-09-06T16:05:00Z' },

  // Request 5: Leo (id: 12) -> Pending
  { requestId: 5, employeeId: 12, status: 'Pending', timestamp: '2025-09-16T18:00:00Z' },

  // Request 6: Nina (id: 14) -> Rejected by Alice (id: 1)
  { requestId: 6, employeeId: 14, status: 'Pending', timestamp: '2025-09-10T11:00:00Z' },
  { requestId: 6, employeeId: 1, status: 'Rejected', timestamp: '2025-09-11T15:30:00Z' },

  // Request 7: Karen (id: 11) -> Approved by Alice (id: 1)
  { requestId: 7, employeeId: 11, status: 'Pending', timestamp: '2025-09-12T09:30:00Z' },
  { requestId: 7, employeeId: 1, status: 'Approved', timestamp: '2025-09-13T10:15:00Z' },

  // Request 8: Oscar (id: 15) -> Approved by Bob (id: 2)
  { requestId: 8, employeeId: 15, status: 'Pending', timestamp: '2025-10-05T13:00:00Z' },
  { requestId: 8, employeeId: 2, status: 'Approved', timestamp: '2025-10-05T13:10:00Z' },
  
  // Request 9: Mona (id: 13) -> Pending
  { requestId: 9, employeeId: 13, status: 'Pending', timestamp: '2025-10-08T16:45:00Z' },

  // Request 10: Leo (id: 12) -> Approved by Bob (id: 2)
  { requestId: 10, employeeId: 12, status: 'Pending', timestamp: '2025-10-10T10:00:00Z' },
  { requestId: 10, employeeId: 2, status: 'Approved', timestamp: '2025-10-11T14:20:00Z' },

  // Request 11: Jack (id: 10) -> Approved by Alice (id: 1)
  { requestId: 11, employeeId: 10, status: 'Pending', timestamp: '2025-08-02T11:00:00Z' },
  { requestId: 11, employeeId: 1, status: 'Approved', timestamp: '2025-08-02T15:00:00Z' },
  
  // Request 12: David (id: 4) -> Rejected by Jack (id: 10)
  { requestId: 12, employeeId: 4, status: 'Pending', timestamp: '2025-08-05T09:12:00Z' },
  { requestId: 12, employeeId: 10, status: 'Rejected', timestamp: '2025-08-05T17:00:00Z' },

  // Request 13: Charlie (id: 3) -> Approved by Nina (id: 14)
  { requestId: 13, employeeId: 3, status: 'Pending', timestamp: '2025-08-10T14:30:00Z' },
  { requestId: 13, employeeId: 14, status: 'Approved', timestamp: '2025-08-11T09:00:00Z' },

  // Request 14: Oscar (id: 15) -> Approved by Bob (id: 2)
  { requestId: 14, employeeId: 15, status: 'Pending', timestamp: '2025-08-15T11:00:00Z' },
  { requestId: 14, employeeId: 2, status: 'Approved', timestamp: '2025-08-15T11:05:00Z' },

  // Request 15: Bob (id: 2) -> Pending
  { requestId: 15, employeeId: 2, status: 'Pending', timestamp: '2025-07-01T22:00:00Z' },

  // Request 16: Eva (id: 5) -> Canceled by self
  { requestId: 16, employeeId: 5, status: 'Pending', timestamp: '2025-11-01T15:00:00Z' },
  { requestId: 16, employeeId: 5, status: 'Canceled', timestamp: '2025-11-02T10:00:00Z' },
  
  // Request 17: Hannah (id: 8) -> Modified by self (still Pending)
  { requestId: 17, employeeId: 8, status: 'Pending', timestamp: '2025-11-04T16:00:00Z' },
  { requestId: 17, employeeId: 8, status: 'Modified', timestamp: '2025-11-05T11:00:00Z' },

  // --- NEW HISTORY FOR REQUESTS 18-40 ---

  // Request 18: Grace (id: 7) -> Pending
  { requestId: 18, employeeId: 7, status: 'Pending', timestamp: '2025-11-06T09:00:00Z' },

  // Request 19: David (id: 4) -> Approved by Jack (id: 10)
  { requestId: 19, employeeId: 4, status: 'Pending', timestamp: '2025-11-06T10:00:00Z' },
  { requestId: 19, employeeId: 10, status: 'Approved', timestamp: '2025-11-06T10:05:00Z' },

  // Request 20: Ian (id: 9) -> Rejected by Bob (id: 2)
  { requestId: 20, employeeId: 9, status: 'Pending', timestamp: '2025-11-07T09:30:00Z' },
  { requestId: 20, employeeId: 2, status: 'Rejected', timestamp: '2025-11-07T14:00:00Z' },

  // Request 21: Mona (id: 13) -> Canceled by self
  { requestId: 21, employeeId: 13, status: 'Pending', timestamp: '2025-11-08T10:00:00Z' },
  { requestId: 21, employeeId: 13, status: 'Canceled', timestamp: '2025-11-08T11:00:00Z' },

  // Request 22: Charlie (id: 3) -> Pending
  { requestId: 22, employeeId: 3, status: 'Pending', timestamp: '2025-11-08T15:30:00Z' },

  // Request 23: Eva (id: 5) -> Pending
  { requestId: 23, employeeId: 5, status: 'Pending', timestamp: '2025-11-09T08:00:00Z' },

  // Request 24: Frank (id: 6) -> Approved by Alice (id: 1)
  { requestId: 24, employeeId: 6, status: 'Pending', timestamp: '2025-11-09T16:00:00Z' },
  { requestId: 24, employeeId: 1, status: 'Approved', timestamp: '2025-11-09T17:00:00Z' },

  // Request 25: Alice (id: 1) -> Pending
  { requestId: 25, employeeId: 1, status: 'Pending', timestamp: '2025-11-10T09:15:00Z' },

  // Request 26: Bob (id: 2) -> Approved by Alice (id: 1)
  { requestId: 26, employeeId: 2, status: 'Pending', timestamp: '2025-11-10T10:00:00Z' },
  { requestId: 26, employeeId: 1, status: 'Approved', timestamp: '2025-11-10T11:00:00Z' },

  // Request 27: Hannah (id: 8) -> Modified by self
  { requestId: 27, employeeId: 8, status: 'Pending', timestamp: '2025-11-11T09:00:00Z' },
  { requestId: 27, employeeId: 8, status: 'Modified', timestamp: '2025-11-11T13:45:00Z' },

  // Request 28: Leo (id: 12) -> Approved by Bob (id: 2)
  { requestId: 28, employeeId: 12, status: 'Pending', timestamp: '2025-11-12T09:00:00Z' },
  { requestId: 28, employeeId: 2, status: 'Approved', timestamp: '2025-11-12T10:30:00Z' },

  // Request 29: Oscar (id: 15) -> Canceled by self
  { requestId: 29, employeeId: 15, status: 'Pending', timestamp: '2025-11-12T14:00:00Z' },
  { requestId: 29, employeeId: 15, status: 'Canceled', timestamp: '2025-11-12T16:00:00Z' },

  // Request 30: Grace (id: 7) -> Approved by Karen (id: 11)
  { requestId: 30, employeeId: 7, status: 'Pending', timestamp: '2025-11-13T08:55:00Z' },
  { requestId: 30, employeeId: 11, status: 'Approved', timestamp: '2025-11-13T09:00:00Z' },

  // Request 31: David (id: 4) -> Approved by Jack (id: 10)
  { requestId: 31, employeeId: 4, status: 'Pending', timestamp: '2025-11-13T10:00:00Z' },
  { requestId: 31, employeeId: 10, status: 'Approved', timestamp: '2025-11-13T10:20:00Z' },

  // Request 32: Ian (id: 9) -> Pending
  { requestId: 32, employeeId: 9, status: 'Pending', timestamp: '2025-11-13T14:30:00Z' },

  // Request 33: Mona (id: 13) -> Approved by Alice (id: 1)
  { requestId: 33, employeeId: 13, status: 'Pending', timestamp: '2025-11-14T08:00:00Z' },
  { requestId: 33, employeeId: 1, status: 'Approved', timestamp: '2025-11-14T08:30:00Z' },

  // Request 34: Charlie (id: 3) -> Rejected by Nina (id: 14)
  { requestId: 34, employeeId: 3, status: 'Pending', timestamp: '2025-11-14T10:00:00Z' },
  { requestId: 34, employeeId: 14, status: 'Rejected', timestamp: '2025-11-14T11:00:00Z' },

  // Request 35: Eva (id: 5) -> Approved by Bob (id: 2)
  { requestId: 35, employeeId: 5, status: 'Pending', timestamp: '2025-11-15T09:00:00Z' },
  { requestId: 35, employeeId: 2, status: 'Approved', timestamp: '2025-11-15T10:00:00Z' },

  // Request 36: Jack (id: 10) -> Pending
  { requestId: 36, employeeId: 10, status: 'Pending', timestamp: '2025-11-15T13:00:00Z' },

  // Request 37: Karen (id: 11) -> Approved by Alice (id: 1)
  { requestId: 37, employeeId: 11, status: 'Pending', timestamp: '2025-11-16T10:00:00Z' },
  { requestId: 37, employeeId: 1, status: 'Approved', timestamp: '2025-11-16T11:00:00Z' },

  // Request 38: Nina (id: 14) -> Pending
  { requestId: 38, employeeId: 14, status: 'Pending', timestamp: '2025-11-17T08:00:00Z' },

  // Request 39: Alice (id: 1) -> Approved by Bob (id: 2)
  { requestId: 39, employeeId: 1, status: 'Pending', timestamp: '2025-11-17T09:30:00Z' },
  { requestId: 39, employeeId: 2, status: 'Approved', timestamp: '2025-11-17T10:00:00Z' },

  // Request 40: Bob (id: 2) -> Pending
  { requestId: 40, employeeId: 2, status: 'Pending', timestamp: '2025-11-18T22:00:00Z' },
];

