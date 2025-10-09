
export interface DepartmentType {
    departmentId: number;
    departmentName: string;
}

export interface DivisionType {
    divisionId: number;
    divisionName: string;
    departmentId: number;
}

export const mockDepartments: DepartmentType[] = [
  { departmentId: 1, departmentName: "HR" },
  { departmentId: 2, departmentName: "Engineering" },
  { departmentId: 3, departmentName: "Marketing" },
  { departmentId: 4, departmentName: "Sales" },
  { departmentId: 5, departmentName: "Finance" }
];

export const mockDivisions: DivisionType[] = [
  // HR divisions
  { divisionId: 1, divisionName: "Recruitment", departmentId: 1 },
  { divisionId: 2, divisionName: "Payroll", departmentId: 1 },
  { divisionId: 3, divisionName: "Training", departmentId: 1 },

  // Engineering divisions
  { divisionId: 4, divisionName: "Backend", departmentId: 2 },
  { divisionId: 5, divisionName: "Frontend", departmentId: 2 },
  { divisionId: 6, divisionName: "DevOps", departmentId: 2 },
  { divisionId: 7, divisionName: "QA", departmentId: 2 },
  { divisionId: 8, divisionName: "Mobile", departmentId: 2 },

  // Marketing divisions
  { divisionId: 9, divisionName: "Digital", departmentId: 3 },
  { divisionId: 10, divisionName: "Events", departmentId: 3 },
  { divisionId: 11, divisionName: "PR", departmentId: 3 },

  // Sales divisions
  { divisionId: 12, divisionName: "B2B", departmentId: 4 },
  { divisionId: 13, divisionName: "Retail", departmentId: 4 },

  // Finance divisions
  { divisionId: 14, divisionName: "Accounts", departmentId: 5 },
  { divisionId: 15, divisionName: "Audit", departmentId: 5 }
];




