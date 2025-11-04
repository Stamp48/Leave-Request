export interface Employee {
    employeeID: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    profilePicture?: string;
    firstLogin: boolean;
    hireDate: Date;
    birthDate: Date;

    //Foreign Key:
    supervisorID?: number;
    departmentID: number;
    positionID: number;
}