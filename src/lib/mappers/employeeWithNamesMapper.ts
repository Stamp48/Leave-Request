import type { EmployeeWithNames } from "@/types/employeeWithNames";
import type { EmployeeWithNamesDTO } from "@/types/employeeWithNames.dto"

const parseDate = (s: string) => new Date(s.replace(" ", "T"));

export function toEmployeeWithNames(dto: EmployeeWithNamesDTO): EmployeeWithNames {
    return {
        employeeID: dto.employee_id,
        email: dto.email,
        firstName: dto.first_name,
        lastName: dto.last_name,
        phone: dto.phone,
        address: dto.address,
        profilePicture: dto.profile_picture,
        hireDate: parseDate(dto.hire_date),
        birthDate: parseDate(dto.birth_date),

        divisionName: dto.division_name,
        departmentName: dto.department_name,
        positionName: dto.position_name,

        supervisorID: dto.supervisor_id,
    }
}

export function toEmployeesWithNames(list: EmployeeWithNamesDTO[]): EmployeeWithNames[]  {
    return list.map(toEmployeeWithNames)
}