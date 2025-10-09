// src/app/lib/utils.ts

import { DepartmentType, DivisionType } from "./mockDataDepDiv";

// Define a type for our final structured object for clarity
export type DepartmentDataForClient = Record<string, string[]>;

export function structureDataForClient(
    departments: DepartmentType[],
    divisions: DivisionType[]
): DepartmentDataForClient {
    return departments.reduce((acc, department) => {
        const relevantDivisions = divisions
            .filter(div => div.departmentId === department.departmentId)
            .map(div => div.divisionName);

        acc[department.departmentName] = relevantDivisions;
        return acc;
    }, {} as DepartmentDataForClient); // Using our defined type here
}


export function getDepartmentName(departmentId: number, departments: DepartmentType[]): string {
    const department = departments.find((dept) => dept.departmentId === departmentId);
    return department ? department.departmentName : "Unknown Department";
}