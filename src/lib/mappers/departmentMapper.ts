import type { DepartmentDTO } from "@/types/department.dto";
import type { Department } from "@/types/department";

export function toDepartment(dto: DepartmentDTO): Department {
  return {
    departmentID: dto.department_id,
    departmentName: dto.department_name,
    divisionID: dto.division_id,
  };
}

export const toDepartments = (list: DepartmentDTO[]) => list.map(toDepartment);
