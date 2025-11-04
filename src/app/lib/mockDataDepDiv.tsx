// Division is now the parent entity
export interface DivisionType {
  division_id: number;
  division_name: string;
}

// Department is now the child entity, linking to a Division
export interface DepartmentType {
  department_id: number;
  department_name: string;
  division_id: number; // Foreign key linking to DivisionType
}

// This list now contains the top-level Divisions
export const mockDivisions: DivisionType[] = [
  { division_id: 1, division_name: "HR" },
  { division_id: 2, division_name: "Engineering" },
  { division_id: 3, division_name: "Marketing" },
  { division_id: 4, division_name: "Sales" },
  { division_id: 5, division_name: "Finance" }
];

// This list now contains the Departments, each belonging to a Division
export const mockDepartments: DepartmentType[] = [
  // HR Departments (Division 1)
  { department_id: 1, department_name: "Recruitment", division_id: 1 },
  { department_id: 2, department_name: "Payroll", division_id: 1 },
  { department_id: 3, department_name: "Training", division_id: 1 },

  // Engineering Departments (Division 2)
  { department_id: 4, department_name: "Backend", division_id: 2 },
  { department_id: 5, department_name: "Frontend", division_id: 2 },
  { department_id: 6, department_name: "DevOps", division_id: 2 },
  { department_id: 7, department_name: "QA", division_id: 2 },
  { department_id: 8, department_name: "Mobile", division_id: 2 },

  // Marketing Departments (Division 3)
  { department_id: 9, department_name: "Digital", division_id: 3 },
  { department_id: 10, department_name: "Events", division_id: 3 },
  { department_id: 11, department_name: "PR", division_id: 3 },

  // Sales Departments (Division 4)
  { department_id: 12, department_name: "B2B", division_id: 4 },
  { department_id: 13, department_name: "Retail", division_id: 4 },

  // Finance Departments (Division 5)
  { department_id: 14, department_name: "Accounts", division_id: 5 },
  { department_id: 15, department_name: "Audit", division_id: 5 }
];