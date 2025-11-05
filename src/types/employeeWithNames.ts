export interface EmployeeWithNames {
    employeeID: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    profilePicture: string | null;
    hireDate: Date;
    birthDate: Date;

    divisionName: string;
    departmentName: string;
    positionName: string;

    supervisorID: number | null;
}