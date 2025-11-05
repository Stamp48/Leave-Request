import type { Employee } from "@/types/employee";
import type { EmployeeDTO } from "@/types/employee.dto"

const parseDate = (s: string) => new Date(s.replace(" ", "T"));

export function toEmployee(dto: EmployeeDTO): Employee {
    return {
        employeeID: dto.employee_id,
        email: dto.email,
        firstName: dto.first_name,
        lastName: dto.last_name,
        phone: dto.phone,
        address: dto.address,
        profilePicture: dto.profile_picture,
        firstLogin: dto.first_login,
        hireDate: parseDate(dto.hire_date),
        birthDate: parseDate(dto.birth_date),

        supervisorID: dto.supervisor_id,
        departmentID: dto.department_id,
        positionID: dto.position_id
    }
}

export function toEmployees(list: EmployeeDTO[]): Employee[]  {
    return list.map(toEmployee)
}