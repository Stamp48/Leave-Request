"use client";

import { useMemo, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import dayjs from "dayjs";

import { EmployeeWithNames } from "@/types/employeeWithNames";
import { Position } from "@/types/position";
import EmployeeEdit from "@/app/components/EmployeeComp/EmployeeEdit";

type Errors = Record<string, string>;

type FormData = {
    employeeID: number;
    firstName: string;
    lastName: string;
    email: string;
    division: string;
    department: string;
    position: string;
    phone: string;
    hireDate: string;   // ISO
    birthDate: string;  // ISO
    supervisorID: number | null;
    address: string;
    profilePicture: string; // base64 หรือ URL
};

export default function EditEmployee({
    employee,
    supervisor,
    isSupervisor,
    orgHierarchyData,
    allEmployees,
    allPositions,
}: {
    employee: EmployeeWithNames;
    supervisor?: EmployeeWithNames;
    isSupervisor: boolean;
    orgHierarchyData: Record<string, string[]>;
    allEmployees: EmployeeWithNames[];
    allPositions: Position[];
}) {
    const [formData, setFormData] = useState<FormData>({
        employeeID: employee.employeeID,
        firstName: employee.firstName ?? "",
        lastName: employee.lastName ?? "",
        email: employee.email ?? "",
        division: employee.divisionName ?? "",
        department: employee.departmentName ?? "",
        position: employee.positionName ?? "",
        phone: employee.phone ?? "",
        hireDate: employee.hireDate ? dayjs(employee.hireDate).toISOString() : "",
        birthDate: employee.birthDate ? dayjs(employee.birthDate).toISOString() : "",
        supervisorID: employee.supervisorID ?? null,
        address: employee.address ?? "",
        profilePicture: employee.profilePicture ?? "",
    });

    const [errors, setErrors] = useState<Errors>({});
    const [availableDepartments, setAvailableDepartments] = useState<string[]>([]);

    const allDivisions = useMemo(() => Object.keys(orgHierarchyData || {}), [orgHierarchyData]);

    const supervisorsInDiv = useMemo(() => {
        if (!formData.division) return [];
        return allEmployees.filter(e => e.divisionName === formData.division);
    }, [allEmployees, formData.division]);

    useEffect(() => {
        const deps = formData.division ? (orgHierarchyData[formData.division] || []) : [];
        setAvailableDepartments(deps);
    }, [formData.division, orgHierarchyData]);

    const validate = () => {
        const temp: Errors = {};
        if (!formData.firstName) temp.firstName = "First name is required.";
        if (!formData.lastName) temp.lastName = "Last name is required.";
        if (!formData.email) temp.email = "Email is required.";
        if (!formData.division) temp.division = "Division is required.";
        if (!formData.department) temp.department = "Department is required.";
        if (!formData.position) temp.position = "Position is required.";
        if (!formData.birthDate) temp.birthDate = "Birth date is required.";
        setErrors(temp);
        return Object.keys(temp).length === 0;
    };

    const handleDivisionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDivision = e.target.value;
        const deps = orgHierarchyData[selectedDivision] || [];
        setFormData(prev => ({
            ...prev,
            division: selectedDivision,
            department: "",
            position: "",
        }));
        setAvailableDepartments(deps);
        setErrors(prev => ({ ...prev, division: "", department: "", position: "" }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as { name: keyof FormData; value: string };
        setFormData(prev => ({ ...prev, [name]: value } as FormData));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const handleChangeDate = (name: "hireDate" | "birthDate", date: any) => {
        setFormData(prev => ({ ...prev, [name]: date ? dayjs(date).toISOString() : "" }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setFormData(prev => ({ ...prev, profilePicture: String(reader.result) }));
        reader.readAsDataURL(file);
    };

    // ...ใน EditEmployeeCSR.tsx ข้างใน component เดิม

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const id = formData.employeeID;

        // สร้าง payload แบบข้อความ (snake_case เฉพาะตอนยิง API)
        const jsonPayload = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            division_name: formData.division,
            department_name: formData.department,
            position_name: formData.position,
            phone: formData.phone,
            hire_date: formData.hireDate ? dayjs(formData.hireDate).format("YYYY-MM-DD") : null,
            birth_date: formData.birthDate ? dayjs(formData.birthDate).format("YYYY-MM-DD") : null,
            supervisor_id: formData.supervisorID,
            address: formData.address,
            // ถ้ารูปเป็น URL เดิม (ไม่ใช่ dataURL) จะไม่แนบรูปใน JSON นี้
        };

        let res: Response;

        // ถ้า profilePicture เป็น dataURL => สร้าง FormData เพื่ออัพโหลดรูป
        if (formData.profilePicture && formData.profilePicture.startsWith("data:")) {
            // แปลง dataURL → Blob
            const dataUrl = formData.profilePicture;
            const [head, bodyBase64] = dataUrl.split(",");
            const mime = head.match(/data:(.*);base64/)?.[1] || "image/jpeg";
            const bin = atob(bodyBase64);
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            const blob = new Blob([bytes], { type: mime });

            const fd = new FormData();
            // ข้อมูลข้อความ
            Object.entries(jsonPayload).forEach(([k, v]) => {
                if (v !== undefined && v !== null) fd.append(k, String(v));
            });
            // แนบไฟล์จริง
            fd.append("profile_picture", blob, `avatar_${id}.png`);

            res = await fetch(`/api/employee/${id}`, {
                method: "PUT",
                body: fd, // ❗️ห้ามตั้ง Content-Type เอง
            });
        } else {
            // ไม่มีการเปลี่ยนรูป → ส่ง JSON ธรรมดา
            res = await fetch(`/api/employee/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jsonPayload),
            });
        }

        if (!res.ok) {
            const txt = await res.text();
            console.error("Update failed:", txt);
            setErrors(prev => ({ ...prev, form: "Update failed." }));
            return;
        }

        // กลับหน้า detail
        window.location.href = `/employees/${id}`;
    };


    if (!orgHierarchyData || !allPositions) {
        return <Typography>Loading organization data...</Typography>;
    }

    return (
        <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#2E8EE4" }}
        >
            <Box sx={{ p: 4, pb: 1 }}>
                <Typography variant="h3" color="white">Edit Employee Detail</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", px: 4, pb: "120px" }}>
                <Box sx={{ width: "100%", maxWidth: "1200px", paddingTop: "20px" }}>
                    <EmployeeEdit
                        formData={formData}
                        handleChange={handleChange}
                        allDivisions={allDivisions}
                        availableDepartments={availableDepartments}
                        handleDivisionChange={handleDivisionChange}
                        supervisorsInDept={supervisorsInDiv}
                        handleChangeDate={handleChangeDate}
                        errors={errors}
                        handleAvatarChange={handleAvatarChange}
                        allPositions={allPositions}
                    />
                </Box>
            </Box>

            <Paper elevation={3} sx={{ position: "sticky", bottom: 0, zIndex: 1100, backgroundColor: "white" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, p: 2, maxWidth: "1240px", mx: "auto" }}>
                    <Button variant="outlined" color="secondary" onClick={() => history.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained">
                        Save Changes
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
