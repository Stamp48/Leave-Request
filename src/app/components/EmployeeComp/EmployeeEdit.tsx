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
    address: string;
    avatarUrl: string;
    supervisorId?: number;
}

interface EmployeeEditProps {
    formData: FormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    departmentData: Record<string, string[]>;
    availableDivisions: string[];
    handleDepartmentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeDate: (name: string, date: any) => void;
    errors: Record<string, string>;
    handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    supervisorsInDept: EmployeeType[]; // array of employee objects
}





export default function EmployeeEdit({ formData, handleChange, departmentData, supervisorsInDept, availableDivisions, handleDepartmentChange, handleChangeDate, errors, handleAvatarChange }: EmployeeEditProps) {
    const router = useRouter();
    return (
        <>

            <Card sx={{ flexGrow: 1, boxShadow: 3, borderRadius: 2 }}>
                <CardHeader
                    // ... (avatar and other header details using formData)
                    avatar={<UploadAvatars srcImg={formData.avatarUrl} width={150} height={150} handleAvatarChange={handleAvatarChange} />}

                    title={<Typography variant="h4">{formData.firstname} {formData.lastname}</Typography>}

                    subheader={
                        <Box>
                            <Typography variant="subtitle1">{formData.position}</Typography>
                            <Typography variant="subtitle2">Employee ID: {formData.id}</Typography>
                        </Box>
                    }
                />

                <CardContent>
                    <Typography variant="h5" sx={{ marginLeft: "25px" }}>Personal Information</Typography>

                    {/* Change Detail components to editable TextField components */}
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                        <TextField
                            label="First Name"
                            name="firstname" /* The 'name' must match the key in your state */
                            value={formData.firstname} /* Display the value from the state */
                            onChange={handleChange} /* Call the parent's function on change */
                            variant="outlined"
                        />
                        <TextField
                            label="Last Name"
                            name="lastname"
                            value={formData.lastname}
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
                        <TextField
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Box>

                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                        <TextField
                            select
                            required
                            label="Department"
                            name="department"
                            value={formData.department}
                            onChange={handleDepartmentChange}
                            fullWidth
                            error={!!errors.department}
                            helperText={errors.department || "Please select a department"}
                        >
                            {Object.keys(departmentData).map((departmentName) => (
                                <MenuItem key={departmentName} value={departmentName}>
                                    {departmentName}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            required
                            label="Division"
                            name="division"
                            value={formData.division}
                            onChange={handleChange}
                            error={!!errors.division}


                            disabled={!formData.department}

                            helperText={!formData.department ? "Please select a department first" : "Please select a division"}
                            fullWidth
                        >

                            {availableDivisions.map((divisionName) => (
                                <MenuItem key={divisionName} value={divisionName}>
                                    {divisionName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                        <TextField
                            label="Position"
                            name="position"
                            type="text"
                            value={formData.position}
                            onChange={handleChange}
                            variant="outlined"
                        />
                        <TextField
                            select
                            label="Supervisor"
                            name="supervisorId"
                            value={formData.supervisorId || ""}
                            onChange={handleChange}
                            fullWidth
                        >
                            {supervisorsInDept
                                .filter(sup => sup.id !== formData.id) // First, remove the current employee
                                .map(sup => (                           // Then, map over the filtered list
                                    <MenuItem key={sup.id} value={sup.id}>
                                        {`${sup.firstname} ${sup.lastname}`}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </Box>

                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Birth Date"
                                name="birthDate"
                                value={formData.birthDate ? dayjs(formData.birthDate) : null}
                                onChange={(date) => handleChangeDate("birthDate", date)}
                                slotProps={{
                                    textField: {
                                        required: true,
                                        error: Boolean(errors.birthDate),
                                        helperText: errors.birthDate ? errors.birthDate : ""
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

                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
                        <TextField
                            label="Address"
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Box>

                </CardContent>

            </Card>
        </>
    );
}
