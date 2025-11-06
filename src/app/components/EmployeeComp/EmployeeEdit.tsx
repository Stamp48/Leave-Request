"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import UploadAvatars from "../UploadAvatar";
import { EmployeeWithNames } from "@/types/employeeWithNames";
import { Position } from "@/types/position";

interface FormData {
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
  profilePicture: string;
}

interface EmployeeEditProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  allDivisions: string[];
  availableDepartments: string[];

  handleDivisionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDate: (name: "hireDate" | "birthDate", date: any) => void;

  errors: Record<string, string>;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  supervisorsInDept: EmployeeWithNames[];
  allPositions: Position[];
}

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
  allPositions,
}: EmployeeEditProps) {
  return (
    <Card sx={{ flexGrow: 1, boxShadow: 3, borderRadius: 2 }}>
      <CardHeader
        sx={{ paddingLeft: "35px" }}
        avatar={
          <UploadAvatars
            srcImg={formData.profilePicture}
            width={150}
            height={150}
            handleAvatarChange={handleAvatarChange}
          />
        }
        title={<Typography variant="h4">{formData.firstName} {formData.lastName}</Typography>}
        subheader={
          <Box>
            <Typography variant="subtitle1">{formData.position}</Typography>
            <Typography variant="subtitle2">Employee ID: {formData.employeeID}</Typography>
          </Box>
        }
      />

      <CardContent>
        <Typography variant="h5" sx={{ marginLeft: "25px" }}>Personal Information</Typography>

        {/* Name row */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, pl: "30px", my: "20px" }}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Box>

        {/* Email + Position */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, pl: "30px", my: "20px" }}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            select
            required
            label="Position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            error={!!errors.position}
            helperText={errors.position || "Please select a position"}
            fullWidth
          >
            {allPositions.map((pos) => (
              <MenuItem key={pos.positionID} value={pos.positionName}>
                {pos.positionName}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Division -> Department */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, pl: "30px", my: "20px" }}>
          <TextField
            select
            required
            label="Division"
            name="division"
            value={formData.division}
            onChange={handleDivisionChange}
            error={!!errors.division}
            helperText={errors.division || "Please select a division"}
            fullWidth
          >
            {allDivisions.map((divisionName) => (
              <MenuItem key={divisionName} value={divisionName}>
                {divisionName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            required
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            error={!!errors.department}
            disabled={!formData.division}
            helperText={!formData.division ? "Please select a division first" : (errors.department || "Please select a department")}
            fullWidth
          >
            {availableDepartments.map((deptName) => (
              <MenuItem key={deptName} value={deptName}>
                {deptName}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Supervisor + Address */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, pl: "30px", my: "20px" }}>
          <TextField
            select
            label="Supervisor"
            name="supervisorID"
            value={formData.supervisorID ?? ""}
            onChange={handleChange}
            fullWidth
          >
            {supervisorsInDept
              .filter(sup => sup.employeeID !== formData.employeeID)
              .map(sup => (
                <MenuItem key={sup.employeeID} value={sup.employeeID}>
                  {`${sup.firstName} ${sup.lastName}`}
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
          />
        </Box>

        {/* Birth Date + Phone */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, pl: "30px", my: "20px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Birth Date"
              value={formData.birthDate ? dayjs(formData.birthDate) : null}
              onChange={(date) => handleChangeDate("birthDate", date)}
              slotProps={{
                textField: {
                  required: true,
                  error: Boolean(errors.birthDate),
                  helperText: errors.birthDate ? errors.birthDate : "",
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
          />
        </Box>
      </CardContent>
    </Card>
  );
}
