export interface EmployeeDTO {
    employee_id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    profile_picture?: string;
    first_login: boolean;
    hire_date: string;
    birth_date: string;

    //Foregin Key:
    supervisor_id: number;
    department_id: number;
    position_id: number;
}