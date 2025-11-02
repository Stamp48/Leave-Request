export interface LeaveRequestType {
  request_id: number;
  employee_id: number;
  employeeAvatarUrl: string;
  employeePosition: string;
  employeeFirstname: string;
  employeeLastname: string;
  // CHANGED: Renamed from 'employeeDivision' to be more explicit
  employeeDivisionName: string; 
  // ADDED: New field for the sub-department
  employeeDepartmentName: string;
  leave_type: string;
  start_date: string; // Using ISO string format (YYYY-MM-DD)
  end_date: string;   // Using ISO string format (YYYY-MM-DD)
  reason: string;
  latestStatus: 'Pending' | 'Approved' | 'Rejected';
  rejectionReason?: string | null;
  isHalfDay: boolean; // True if the *entire* request is a single half-day
  isMorning: boolean | null; // Relevant only if isHalfDay is true
  isFirstHalfDay: boolean; // True if the first day of a multi-day leave is a half day
  isLastHalfDay: boolean; // True if the last day of a multi-day leave is a half day
}

export const mockLeaveRequests: LeaveRequestType[] = [
  {
    request_id: 1,
    employee_id: 12,
    employeeFirstname: "Leo",
    employeeLastname: "Jackson",
    employeeAvatarUrl: "/avatars/leo.jpg",
    employeePosition: "QA Engineer",
    employeeDivisionName: "Engineering", // CHANGED: Renamed field
    employeeDepartmentName: "QA", // ADDED
    leave_type: 'Annual',
    start_date: '2025-11-03',
    end_date: '2025-11-07',
    reason: 'Family vacation',
    latestStatus: 'Approved',
    rejectionReason: null,
    isHalfDay: false,
    isMorning: null,
    isFirstHalfDay: false,
    isLastHalfDay: false,
  },
  {
    request_id: 2,
    employee_id: 15,
    employeeFirstname: "Oscar",
    employeeLastname: "Martin",
    employeeAvatarUrl: "/avatars/oscar.jpg",
    employeePosition: "Mobile Developer",
    employeeDivisionName: "Engineering", // CHANGED: Renamed field
    employeeDepartmentName: "Mobile", // ADDED
    leave_type: 'Sick',
    start_date: '2025-09-05',
    end_date: '2025-09-05',
    reason: 'Flu',
    latestStatus: 'Approved',
    rejectionReason: null,
    isHalfDay: false,
    isMorning: null,
    isFirstHalfDay: false,
    isLastHalfDay: false,
  },
  {
    request_id: 3,
    employee_id: 11,
    employeeFirstname: "Karen",
    employeeLastname: "Thomas",
    employeeAvatarUrl: "/avatars/karen.jpg",
    employeePosition: "Finance Manager",
    employeeDivisionName: "Finance", // CHANGED: Renamed field
    employeeDepartmentName: "Audit", // ADDED
    leave_type: 'Personal',
    start_date: '2025-09-10',
    end_date: '2025-09-10',
    reason: 'Dentist appointment',
    latestStatus: 'Pending',
    rejectionReason: null,
    isHalfDay: true,
    isMorning: true,
    isFirstHalfDay: false,
    isLastHalfDay: false,
  },
  {
    request_id: 4,
    employee_id: 3,
    employeeFirstname: "Charlie",
    employeeLastname: "Williams",
    employeeAvatarUrl: "/avatars/charlie.jpg",
    employeePosition: "Content Strategist",
    employeeDivisionName: "Marketing", // CHANGED: Renamed field
    employeeDepartmentName: "Digital", // ADDED
    leave_type: 'Personal',
    start_date: '2025-09-12',
    end_date: '2025-09-12',
    reason: 'Parent-teacher meeting',
    latestStatus: 'Approved',
    rejectionReason: null,
    isHalfDay: true,
    isMorning: false,
    isFirstHalfDay: false,
    isLastHalfDay: false,
  },
  {
    request_id: 5,
    employee_id: 12,
    employeeFirstname: "Leo",
    employeeLastname: "Jackson",
    employeeAvatarUrl: "/avatars/leo.jpg",
    employeePosition: "QA Engineer",
    employeeDivisionName: "Engineering", // CHANGED: Renamed field
    employeeDepartmentName: "QA", // ADDED
    leave_type: 'Sick',
    start_date: '2025-09-17',
    end_date: '2025-09-19',
    reason: 'Food poisoning',
    latestStatus: 'Pending',
    rejectionReason: null,
    isHalfDay: false,
    isMorning: null,
    isFirstHalfDay: false,
    isLastHalfDay: false,
  },
  {
    request_id: 6,
    employee_id: 14,
    employeeFirstname: "Nina",
    employeeLastname: "Harris",
    employeeAvatarUrl: "/avatars/nina.jpg",
    employeePosition: "Marketing Lead",
    employeeDivisionName: "Marketing", // CHANGED: Renamed field
    employeeDepartmentName: "PR", // ADDED
    leave_type: 'Personal',
    start_date: '2025-09-20',
    end_date: '2025-09-20',
    reason: 'Concert',
    latestStatus: 'Rejected',
    rejectionReason: 'Non-essential travel during peak period.',
    isHalfDay: false,
    isMorning: null,
    isFirstHalfDay: false,
    isLastHalfDay: false,
  },
  {
    request_id: 7,
    employee_id: 11,
    employeeFirstname: "Karen",
    employeeLastname: "Thomas",
    employeeAvatarUrl: "/avatars/karen.jpg",
    employeePosition: "Finance Manager",
    employeeDivisionName: "Finance", // CHANGED: Renamed field
    employeeDepartmentName: "Audit", // ADDED
    leave_type: 'Annual',
    start_date: '2025-10-01',
    end_date: '2025-10-05',
    reason: 'Trip to Japan',
    latestStatus: 'Approved',
    rejectionReason: null,
    isHalfDay: false,
    isMorning: null,
    isFirstHalfDay: false,
    isLastHalfDay: false,
  },
  {
    request_id: 8,
    employee_id: 15,
    employeeFirstname: "Oscar",
    employeeLastname: "Martin",
    employeeAvatarUrl: "/avatars/oscar.jpg",
    employeePosition: "Mobile Developer",
    employeeDivisionName: "Engineering", // CHANGED: Renamed field
    employeeDepartmentName: "Mobile", // ADDED
    leave_type: 'Bereavement',
    start_date: '2025-10-08',
    end_date: '2025-10-10',
    reason: 'Funeral service',
    latestStatus: 'Approved',
    rejectionReason: null,
    isHalfDay: false,
    isMorning: null,
    isFirstHalfDay: false,
    isLastHalfDay: false,
  },
  {
    request_id: 9,
    employee_id: 13,
    employeeFirstname: "Mona",
    employeeLastname: "White",
    employeeAvatarUrl: "/avatars/mona.jpg",
    employeePosition: "Training Coordinator",
    employeeDivisionName: "HR", // CHANGED: Renamed field
    employeeDepartmentName: "Training", // ADDED
    leave_type: 'Annual',
    start_date: '2025-10-15',
    end_date: '2025-10-19',
    reason: 'Holiday leave',
    latestStatus: 'Pending',
    rejectionReason: null,
    isHalfDay: false,
    isMorning: null,
    isFirstHalfDay: false,
    isLastHalfDay: false,
  },
  {
    request_id: 10,
    employee_id: 12,
    employeeFirstname: "Leo",
    employeeLastname: "Jackson",
    employeeAvatarUrl: "/avatars/leo.jpg",
    employeePosition: "QA Engineer",
    employeeDivisionName: "Engineering", // CHANGED: Renamed field
    employeeDepartmentName: "QA", // ADDED
    leave_type: 'Annual',
    start_date: '2025-10-22',
    end_date: '2025-10-26',
    reason: 'Christmas holiday',
    latestStatus: 'Approved',
    rejectionReason: null,
    isHalfDay: false,
    isMorning: null,
    isFirstHalfDay: false,
    isLastHalfDay: false,
  },
  {
    request_id: 11,
    employee_id: 10,
    employeeFirstname: "Jack",
    employeeLastname: "Anderson",
    employeeAvatarUrl: "/avatars/jack.jpg",
    employeePosition: "Sales Associate Lead",
    employeeDivisionName: "Sales", // CHANGED: Renamed field
    employeeDepartmentName: "Retail", // ADDED
    leave_type: 'Personal',
    start_date: '2025-08-05',
    end_date: '2025-08-07',
    reason: 'Moving house',
    latestStatus: 'Approved',
    rejectionReason: null,
    isHalfDay: false,
    isMorning: null,
    isFirstHalfDay: true,
    isLastHalfDay: false,
  },
  {
    request_id: 12,
    employee_id: 4,
    employeeFirstname: "David",
    employeeLastname: "Brown",
    employeeAvatarUrl: "/avatars/david.jpg",
    employeePosition: "Sales Executive",
    employeeDivisionName: "Sales", // CHANGED: Renamed field
    employeeDepartmentName: "B2B", // ADDED
    leave_type: 'Unpaid',
    start_date: '2025-08-12',
    end_date: '2025-08-14',
    reason: 'Personal project',
    latestStatus: 'Rejected',
    rejectionReason: 'Insufficient notice provided.',
    isHalfDay: false,
    isMorning: null,
    isFirstHalfDay: false,
    isLastHalfDay: false,
  },
  {
    request_id: 13,
    employee_id: 3,
    employeeFirstname: "Charlie",
    employeeLastname: "Williams",
    employeeAvatarUrl: "/avatars/charlie.jpg",
    employeePosition: "Content Strategist",
    employeeDivisionName: "Marketing", // CHANGED: Renamed field
    employeeDepartmentName: "Digital", // ADDED
    leave_type: 'Annual',
    start_date: '2025-08-19',
    end_date: '2025-08-21',
    reason: 'Attending wedding',
    latestStatus: 'Approved',
    rejectionReason: null,
    isHalfDay: false,
    isMorning: null,
    isFirstHalfDay: false,
    isLastHalfDay: true,
  },
  {
    request_id: 14,
    employee_id: 15,
    employeeFirstname: "Oscar",
    employeeLastname: "Martin",
    employeeAvatarUrl: "/avatars/oscar.jpg",
    employeePosition: "Mobile Developer",
    employeeDivisionName: "Engineering", // CHANGED: Renamed field
    employeeDepartmentName: "Mobile", // ADDED
    leave_type: 'Paternity',
    start_date: '2025-08-26',
    end_date: '2025-08-30',
    reason: 'Birth of child',
    latestStatus: 'Approved',
    rejectionReason: null,
    isHalfDay: false,
    isMorning: null,
    isFirstHalfDay: false,
    isLastHalfDay: false,
  },
  {
    request_id: 15,
    employee_id: 2,
    employeeFirstname: "Bob",
    employeeLastname: "Johnson",
    employeeAvatarUrl: "/avatars/bob.jpg",
    employeePosition: "Senior Backend Engineer",
    employeeDivisionName: "Engineering", // CHANGED: Renamed field
    employeeDepartmentName: "Backend", // ADDED
    leave_type: 'Sick',
    start_date: '2025-07-02',
    end_date: '2025-07-04',
    reason: 'Migraine',
    latestStatus: 'Pending',
    rejectionReason: null,
    isHalfDay: false,
    isMorning: null,
    isFirstHalfDay: true,
    isLastHalfDay: true,
  },
];