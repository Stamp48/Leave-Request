"use client";
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { DepartmentType, DivisionType } from "@/app/lib/mockDataDepDiv";
import MenuItem from '@mui/material/MenuItem';
import { EmployeeType } from "@/app/lib/mockDataEmp";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";


interface FormData {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  department: string;
  division: string;
  position: string;
  phone: string;
  hireDate: string;
  birthDate: string;
}

type Errors = Record<string, string>;

function generateRandomPassword(length = 12) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

export default function AddEmployee({ departmentData, existingEmployees }: { departmentData: Record<string, string[]>, existingEmployees: EmployeeType[] }) {

  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    id: 0,
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    department: "",
    division: "",
    position: "",
    phone: "",
    hireDate: "",
    birthDate: "",
  });

  const [availableDivisions, setAvailableDivisions] = useState<string[]>([]);

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDept = e.target.value;
    setFormData({
      ...formData,
      department: selectedDept,
      division: "",
    });

    setAvailableDivisions(departmentData[selectedDept] || []);
  };

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // 1. Generate a new unique ID
      const highestId = existingEmployees.reduce((maxId, user) => Math.max(user.id, maxId), 0);
      const newEmployeeId = highestId + 1;

      // 2. Generate the username
      const username = `user${newEmployeeId}`;

      // 3. Generate a random password
      const password = generateRandomPassword();

      const finalFormData = {
        ...formData,
        id: newEmployeeId,
        username: username,
        password: password,
        hireDate: dayjs().toISOString(),
      };
      setFormData(finalFormData);

      console.log("Submitted:", finalFormData);
      alert(`Employee added successfully on ${dayjs(finalFormData.hireDate).format("MMMM D, YYYY")}!`);
      // Now you can send `finalFormData` to your API

      router.push("/employees");
    } else {
      console.log("Validation Failed");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", // Stacks children vertically
      }}
    >

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          paddingTop:"25px",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: 320,
          }}
        >
          <TextField
            required
            label="Firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            variant="outlined"
            error={!!errors.firstname}
            helperText={errors.firstname || ""}
          />
          <TextField
            required
            label="Lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            error={!!errors.lastname}
            helperText={errors.lastname || ""}
            variant="outlined"
          />
          <TextField
            required
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email || ""}
          />

          <TextField
            select
            required
            label="Division"
            name="department"
            value={formData.department}
            onChange={handleDepartmentChange}
            fullWidth
            error={!!errors.department}
            helperText={errors.department || "Please select a division"}
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
            label="Department"
            name="division"
            value={formData.division}
            onChange={handleChange}
            error={!!errors.division}


            disabled={!formData.department}

            helperText={!formData.department ? "Please select a division first" : "Please select a department"}
            fullWidth
          >

            {availableDivisions.map((divisionName) => (
              <MenuItem key={divisionName} value={divisionName}>
                {divisionName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            required
            label="Position"
            name="position"
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
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            variant="outlined"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Birth Date"
              name="birthDate"
              value={formData.birthDate ? dayjs(formData.birthDate) : null}
              onChange={(newValue) => {
                setFormData({ ...formData, birthDate: newValue ? newValue.toISOString() : "" });
              }}
              slotProps={{
                textField: {
                  required: true,
                  error: Boolean(errors.birthDate),
                  helperText: errors.birthDate ? errors.birthDate : ""
                },
              }}
            />
          </LocalizationProvider>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

