"use client"
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Detail from "../Detail";
import Box from "@mui/material/Box";
import CardHeader from '@mui/material/CardHeader';
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import UploadAvatars from "../UploadAvatar";
import { EmployeeType } from "@/app/lib/mockDataEmp";
// NEW: Import PositionType. Adjust path if needed (e.g., /mockDataPos)
import { PositionType } from "@/app/lib/mockPosition";

/**
 * FIXED: This FormData interface now matches the parent component's state.
 */
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
 * FIXED: The props interface is updated to match the parent component.
 */
interface EmployeeEditProps {
    formData: FormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

    // This prop is the list of top-level divisions: ["Division1", "Division2"]
    allDivisions: string[];
    // This prop is the list of depts for the *selected* division: ["Dept1", "Dept2"]
    availableDepartments: string[];
    // This is the handler for the DIVISION dropdown
    handleDivisionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeDate: (name: string, date: any) => void;
    errors: Record<string, string>;
    handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    supervisorsInDept: EmployeeType[]; // This is supervisors in the division
    // NEW: Add the prop for all positions
    allPositions: PositionType[];
}

/**
 * FIXED: This component now renders the edit fields with the correct
 * Division > Department logic.
 */
export default function EmployeeEdit({
    formData,
    handleChange,
    allDivisions,
    availableDepartments,
    handleDivisionChange,
    handleChangeDate,
    errors,
    handleAvatarChange,
    supervisorsInDept,
    allPositions // NEW: Destructure the new prop
}: EmployeeEditProps) {
    const router = useRouter();
    return (
        <>
            <Card sx={{ flexGrow: 1, boxShadow: 3, borderRadius: 2 }}>
                <CardHeader
                    // FIXED: Use correct formData keys
                    sx={{ paddingLeft: "35px" }}
                    avatar={<UploadAvatars srcImg={formData.profile_picture} width={150} height={150} handleAvatarChange={handleAvatarChange} />}
                    title={<Typography variant="h4">{formData.first_name} {formData.last_name}</Typography>}
                    subheader={
                        <Box>
                            <Typography variant="subtitle1">{formData.position}</Typography>
                            {/* FIXED: Use correct formData key */}
                            <Typography variant="subtitle2">Employee ID: {formData.employee_id}</Typography>
                        </Box>
                    }
                />

                <CardContent>
                    <Typography variant="h5" sx={{ marginLeft: "25px" }}>Personal Information</Typography>

                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                        <TextField
                            label="First Name"
                            name="first_name" // FIXED: Key
                            value={formData.first_name} // FIXED: Key
                            onChange={handleChange}
                            variant="outlined"
                        />
                        <TextField
                            label="Last Name"
                            name="last_name" // FIXED: Key
                            value={formData.last_name} // FIXED: Key
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Box>

                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            variant="outlined"
                        />
                        {/* NEW: Changed Position to a dropdown */}
                        <TextField
                            select
                            required
                            label="Position"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.position}
                            helperText={errors.position || "Please select a position"}
                        >
                            {allPositions.map((pos) => (
                                <MenuItem key={pos.position_id} value={pos.name}>
                                    {pos.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    {/* --- LOGIC FLIPPED --- */}
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                        <TextField
                            select
                            required
                            label="Division" // FIXED: Division comes first
                            name="division"
                            value={formData.division}
                            onChange={handleDivisionChange} // FIXED: Use division handler
                            fullWidth
                            error={!!errors.division}
                            helperText={errors.division || "Please select a division"}
                        >
                            {/* FIXED: Iterate over allDivisions */}
                            {allDivisions.map((divisionName) => (
                                <MenuItem key={divisionName} value={divisionName}>
                                    {divisionName}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            required
                            label="Department" // FIXED: Department comes second
                            name="department"
                            value={formData.department}
                            onChange={handleChange} // FIXED: Use general handler
                            error={!!errors.department}
                            disabled={!formData.division} // FIXED: Disabled if no division
                            helperText={!formData.division ? "Please select a division first" : "Please select a department"}
                            fullWidth
                        >
                            {/* FIXED: Iterate over availableDepartments */}
                            {availableDepartments.map((deptName) => (
                                <MenuItem key={deptName} value={deptName}>
                                    {deptName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>

                        <TextField
                            select
                            label="Supervisor"
                            name="supervisor_id" // FIXED: Key
                            value={formData.supervisor_id || ""} // FIXED: Key
                            onChange={handleChange}
                            fullWidth
                        >
                            {supervisorsInDept
                                // FIXED: Use correct key for filter
                                .filter(sup => sup.employee_id !== formData.employee_id)
                                .map(sup => (
                                    <MenuItem key={sup.employee_id} value={sup.employee_id}>
                                        {`${sup.first_name} ${sup.last_name}`}
                                    </MenuItem>
                                ))
                            }
                        </TextField>

                        <TextField
                            label="Address"
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            variant="outlined"
                        />

                    </Box>

                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Birth Date"
                                name="birth_date" // FIXED: Key
                                value={formData.birth_date ? dayjs(formData.birth_date) : null} // FIXED: Key
                                onChange={(date) => handleChangeDate("birth_date", date)} // FIXED: Key
                                slotProps={{
                                    textField: {
                                        required: true,
                                        error: Boolean(errors.birth_date), // FIXED: Key
                                        helperText: errors.birth_date ? errors.birth_date : "" // FIXED: Key
                                    },
                                }}
                            />
                        </LocalizationProvider>
                        <TextField
                            label="Phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            variant="outlined"
                        />

                    </Box>

                </CardContent>

            </Card>
        </>
    );
}

