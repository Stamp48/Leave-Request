export interface PositionType {
  position_id: number;
  name: string;
}

/**
 * A consolidated list of positions, as requested, to be shared by employees.
 */
export const mockPositions: PositionType[] = [
  { position_id: 1, name: "HR Manager" },
  { position_id: 2, name: "HR Specialist" }, // For Payroll, Training
  { position_id: 3, name: "Engineering Manager" }, // For Bob
  { position_id: 4, name: "Senior Backend Engineer" }, // Kept Bob's original title
  { position_id: 5, name: "Software Engineer" }, // For Frontend, Mobile
  { position_id: 6, name: "DevOps Engineer" },
  { position_id: 7, name: "QA Engineer" },
  { position_id: 8, name: "Marketing Lead" }, // For Nina
  { position_id: 9, name: "Marketing Specialist" }, // For Content, Events
  { position_id: 10, name: "Sales Associate Lead" }, // For Jack
  { position_id: 11, name: "Sales Executive" },
  { position_id: 12, name: "Finance Manager" },
  { position_id: 13, name: "Accountant" },
];