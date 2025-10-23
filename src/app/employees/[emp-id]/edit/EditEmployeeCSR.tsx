"use client"
import EmployeeDetail from "@/app/components/EmployeeComp/EmployeeDetail";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EmployeeCard from "@/app/components/EmployeeComp/EmployeeCard";
import CardHeader from '@mui/material/CardHeader';
import { useRouter } from "next/navigation";
import { EmployeeType } from "@/app/employees/page";
import Button from "@mui/material/Button";
import EmployeeEdit from "@/app/components/EmployeeComp/EmployeeEdit";
import { useState } from "react";
import dayjs from "dayjs";
import { useEffect } from "react";

interface FormData {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    department: string;
    division: string;
    position: string;
    phone: string;
    hireDate: string;
    birthDate: string;
    supervisorId?: number;
    address: string;
    avatarUrl: string;
}


export default function EditEmployee({ employee, supervisor, isSupervisor, departmentData, supervisorsInDept }: { employee: EmployeeType, supervisor?: EmployeeType, isSupervisor: boolean, departmentData: Record<string, string[]>, supervisorsInDept: EmployeeType[] }) {
    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({
        id: employee.id,
        firstname: employee.firstname,
        lastname: employee.lastname,
        username: employee.username,
        email: employee.email,
        department: employee.department,
        division: employee.division,
        position: employee.position,
        phone: employee.phone,
        hireDate: employee.hireDate,
        birthDate: employee.birthDate,
        address: employee.address,
        avatarUrl: employee.avatarUrl,
        supervisorId: employee.supervisorId
    });

    type Errors = Record<string, string>;


    const [errors, setErrors] = useState<Errors>({});

    const validate = () => {
        const tempErrors: Errors = {};
        if (!formData.firstname) tempErrors.firstname = "First name is required.";
        if (!formData.lastname) tempErrors.lastname = "Last name is required.";
        if (!formData.email) tempErrors.email = "Email is required.";
        if (!formData.birthDate) tempErrors.birthDate = "Birth date is required.";
        if (!formData.department) tempErrors.department = "Department is required.";
        if (!formData.division) tempErrors.division = "Division is required.";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const [availableDivisions, setAvailableDivisions] = useState<string[]>([employee.division]);


    useEffect(() => {
        // Check if we have the necessary data
        if (employee.department && departmentData) {
            // Set the initial divisions based on the employee's current department
            setAvailableDivisions(departmentData[employee.department] || []);
        }
    }, [employee, departmentData]);

    const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDept = e.target.value;
        setFormData({
            ...formData,
            department: selectedDept,
            division: "",
        });

        setAvailableDivisions(departmentData[selectedDept] || []);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeDate = (name: string, date: any) => {
        const formattedDate = date ? dayjs(date).toISOString() : "";
        setFormData((prev) => ({ ...prev, [name]: formattedDate }));
    }

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Read the file as a data URL
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prev) => ({ ...prev, avatarUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            // Here you would typically send formData to your backend API to update the employee record
            console.log("Updated Employee Data:", formData);
            // After successful update, navigate back or show a success message
            router.push(`/employees/${employee.id}`);
        }
    };

    return (

        <Box  onSubmit={handleSubmit} component="form" sx={{ display: "flex", flexDirection: "column", gap: 4, padding: 4, backgroundColor: "#1976d2" }}>
            <Typography variant="h3" color="white">
                Edit Employee Detail
            </Typography>

            <Box sx={{ display: "flex" }}>
                <EmployeeEdit
                    formData={formData}
                    handleChange={handleChange}
                    departmentData={departmentData}
                    supervisorsInDept={supervisorsInDept}
                    availableDivisions={availableDivisions}
                    handleDepartmentChange={handleDepartmentChange}
                    handleChangeDate={handleChangeDate}
                    errors={errors}
                    handleAvatarChange={handleAvatarChange}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 2,
                }}
            >


            </Box>
            <Button type="submit" variant="contained">
                Submit
            </Button>

        </Box>
    );
}