export interface EmployeeWithNamesDTO {
    employee_id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    profile_picture: string | null;
    hire_date: string;
    birth_date: string;

    division_name: string;
    department_name: string;
    position_name: string;

    supervisor_id: number | null;
}