"use client"
import EmployeeDetail from "@/app/components/EmployeeComp/EmployeeDetail";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EmployeeCard from "@/app/components/EmployeeComp/EmployeeCard";
import CardHeader from '@mui/material/CardHeader';
import { useRouter } from "next/navigation";
import { EmployeeType } from "@/app/lib/mockDataEmp";
import Button from "@mui/material/Button";
import EmployeeEdit from "@/app/components/EmployeeComp/EmployeeEdit";
import { useState, useEffect, useMemo } from "react"; // Added useMemo
import dayjs from "dayjs";
import { getSupervisorsByDivision } from "@/app/lib/utils";
// Import PositionType, adjust path as needed
import { PositionType } from "@/app/lib/mockPosition"; 
// NEW: Import Paper for the sticky action bar
import Paper from "@mui/material/Paper";


interface FormData {
    employee_id: number;
    first_name: string;
    last_name: string;
    email: string;
    division: string;
    department: string;
    position: string;
    phone: string;
    hire_date: string;
    birth_date: string;
    supervisor_id: number | null;
    address: string;
    profile_picture: string;
}

/**
 * Main component for editing an employee's details.
 * LOGIC FIXED: Now assumes Division > Department hierarchy.
 */
export default function EditEmployee({
    employee,
    supervisor,
    isSupervisor,
    orgHierarchyData,
    allEmployees,
    allPositions // NEW: Accept allPositions prop
}: {
    employee: EmployeeType,
    supervisor?: EmployeeType,
    isSupervisor: boolean,
    orgHierarchyData: Record<string, string[]>,
    allEmployees: EmployeeType[],
    allPositions: PositionType[] // NEW: Type for allPositions
}) {
    // --- ALL HOOKS MUST BE AT THE TOP ---
    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({
        employee_id: employee.employee_id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        division: employee.division,
        department: employee.department,
        position: employee.position,
        phone: employee.phone,
        hire_date: employee.hire_date,
        birth_date: employee.birth_date,
        address: employee.address,
        profile_picture: employee.profile_picture,
        supervisor_id: employee.supervisor_id
    });

    type Errors = Record<string, string>;
    const [errors, setErrors] = useState<Errors>({});

    // This state now holds the departments available for the *selected* division
    const [availableDepartments, setAvailableDepartments] = useState<string[]>([]);

    // Use useMemo for derived values
    const supervisorsInDiv = useMemo(() => {
        return getSupervisorsByDivision(allEmployees, employee?.division || "");
    }, [allEmployees, employee?.division]);

    const allDivisions = useMemo(() => {
        // Add fallback for safety during initial render
        return Object.keys(orgHierarchyData || {});
    }, [orgHierarchyData]);
    
    // FIXED: This hook now sets the *initial department list* based on the
    // employee's *current division* when the component loads.
    useEffect(() => {
        if (employee.division && orgHierarchyData) {
            // Set the initial list of departments based on the employee's division
            setAvailableDepartments(orgHierarchyData[employee.division] || []);
        }
    }, [employee.division, orgHierarchyData]);
    
    // --- END OF HOOKS ---


    const validate = () => {
        const tempErrors: Errors = {};
        if (!formData.first_name) tempErrors.firstname = "First name is required.";
        if (!formData.last_name) tempErrors.lastname = "Last name is required.";
        if (!formData.email) tempErrors.email = "Email is required.";
        if (!formData.birth_date) tempErrors.birthDate = "Birth date is required.";
        if (!formData.department) tempErrors.department = "Department is required.";
        if (!formData.division) tempErrors.division = "Division is required.";
        // NEW: Added validation for position
        if (!formData.position) tempErrors.position = "Position is required.";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };


    // RENAMED & FIXED: This function now handles the DIVISION change
    const handleDivisionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDivision = e.target.value;

        // Get the new list of departments for the selected division
        const newDepartments = orgHierarchyData[selectedDivision] || [];

        setFormData({
            ...formData,
            division: selectedDivision,
            department: "", // Reset department, as the old one is no longer valid
            position: "", // Also reset position if it's tied to department/division
        });

        // Update the state to populate the department dropdown
        setAvailableDepartments(newDepartments);
    };

    // This handler is for simple text inputs, including the Department dropdown
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
                setFormData((prev) => ({ ...prev, profile_picture: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            // Here you would typically send formData to your backend API
            console.log("Updated Employee Data:", formData);
            // After successful update, navigate back
            router.push(`/employees/${employee.employee_id}`);
        }
    };

    // Loading check (safe to do after hooks)
    if (!orgHierarchyData || !allPositions) {
        return <Typography>Loading organization data...</Typography>;
    }

    return (
        // The form tag is now on the main container
        <Box 
            onSubmit={handleSubmit} 
            component="form" 
            sx={{ 
                display: "flex", 
                flexDirection: "column", 
                minHeight: "100vh", // Ensure it fills the screen
                backgroundColor: "#2E8EE4" // FIXED: Reverted to blue background
            }}
        >
            {/* 1. Header Area */}
            <Box sx={{ p: 4, pb: 1 }}> {/* Reduced bottom padding */}
                {/* FIXED: Reverted to white text */}
                <Typography variant="h3" color="white"> 
                    Edit Employee Detail
                </Typography>
            </Box>

            {/* 2. Main Form Content Area */}
            <Box sx={{ 
                display: "flex", 
                justifyContent: "center", // Center the card
                px: 4, // Padding on the sides
                pb: '120px' // Padding at the bottom to avoid sticky footer
            }}>
                {/* Constrain the width of the form card for better readability */}
                <Box sx={{ width: '100%', maxWidth: '1200px', paddingTop:"20px"}}>
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
                        allPositions={allPositions} // FIXED: Pass positions
                    />
                </Box>
            </Box>

            {/* 3. Sticky Action Bar at the bottom (Kept) */}
            <Paper 
                elevation={3} 
                sx={{ 
                    position: 'sticky', 
                    bottom: 0, 
                    zIndex: 1100, // Make sure it's on top
                    backgroundColor: 'white'
                }}
            >
                <Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end', 
                        gap: 2, 
                        p: 2,
                        // Constrain width and center it
                        maxWidth: '1240px', // Match content width + padding
                        mx: 'auto'
                    }}
                >
                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        onClick={() => router.back()} // Good UX
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        variant="contained"
                    >
                        Save Changes
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

