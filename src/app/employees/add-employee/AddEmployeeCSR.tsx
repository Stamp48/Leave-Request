"use client";
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import MenuItem from '@mui/material/MenuItem';
import { EmployeeType } from "@/app/lib/mockDataEmp";
import { PositionType } from "@/app/lib/mockPosition"; // 1. Import PositionType
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";


// 2. Updated FormData to be cleaner
interface NewEmployeeFormData {
  first_name: string;
  last_name: string;
  email: string;
  division: string;
  department: string;
  position: string;
  phone: string;
  birth_date: string;
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

// 3. Updated props to accept new data
export default function AddEmployee({ 
  orgHierarchyData, 
  existingEmployees,
  allPositions
}: { 
  orgHierarchyData: Record<string, string[]>, 
  existingEmployees: EmployeeType[],
  allPositions: PositionType[]
}) {

  const router = useRouter();

  // 4. Use the new, cleaner FormData interface
  const [formData, setFormData] = useState<NewEmployeeFormData>({
    first_name: "",
    last_name: "",
    email: "",
    division: "",
    department: "",
    position: "",
    phone: "",
    birth_date: "",
  });

  // 5. Renamed state to be logical
  const [availableDepartments, setAvailableDepartments] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});

  // 6. Flipped validation logic
  const validate = () => {
    const tempErrors: Errors = {};
    if (!formData.first_name) tempErrors.first_name = "First name is required.";
    if (!formData.last_name) tempErrors.last_name = "Last name is required.";
    if (!formData.email) tempErrors.email = "Email is required.";
    if (!formData.birth_date) tempErrors.birth_date = "Birth date is required.";
    if (!formData.division) tempErrors.division = "Division is required.";
    if (!formData.department) tempErrors.department = "Department is required.";
    if (!formData.position) tempErrors.position = "Position is required."; // 7. Added position validation
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // 8. Flipped handler logic
  const handleDivisionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDivision = e.target.value;
    const newDepartments = orgHierarchyData[selectedDivision] || [];
    
    setFormData({
      ...formData,
      division: selectedDivision,
      department: "", // Reset department
      position: "", // Also reset position
    });

    setAvailableDepartments(newDepartments);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // 1. Generate a new unique ID
      const highestId = existingEmployees.reduce((maxId, user) => Math.max(user.employee_id, maxId), 0);
      const newEmployeeId = highestId + 1;

      // 2. Generate a random password (you would email this)
      const password = generateRandomPassword();

      // 3. Create the final new employee object
      const newEmployee: EmployeeType = {
        ...formData,
        employee_id: newEmployeeId,
        hire_date: dayjs().toISOString(),
        supervisor_id: null,
        profile_picture: "/avatars/default.jpg", // A sensible default
        address: "", // Default address
      };
      
      console.log("New Employee Created:", newEmployee);
      console.log(`Generated Password (for testing): ${password}`);
      
      // 9. REMOVED alert()
      // alert(`Employee added successfully on ${dayjs(newEmployee.hire_date).format("MMMM D, YYYY")}!`);
      
      router.push("/employees");
    } else {
      console.log("Validation Failed");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center the form
        py: 4,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom color="primary.main">
        Add New Employee
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.5, // Increased gap
          width: "100%",
          maxWidth: 400, // Constrain width
        }}
      >
        <TextField
          required
          label="First Name" // Corrected label
          name="first_name" // Corrected name
          value={formData.first_name}
          onChange={handleChange}
          variant="outlined"
          error={!!errors.first_name}
          helperText={errors.first_name || ""}
        />
        <TextField
          required
          label="Last Name" // Corrected label
          name="last_name" // Corrected name
          value={formData.last_name}
          onChange={handleChange}
          error={!!errors.last_name}
          helperText={errors.last_name || ""}
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

        {/* 10. FIXED: Division Dropdown */}
        <TextField
          select
          required
          label="Division"
          name="division"
          value={formData.division}
          onChange={handleDivisionChange} // Use the correct handler
          fullWidth
          error={!!errors.division}
          helperText={errors.division || "Please select a division"}
        >
          {Object.keys(orgHierarchyData).map((divisionName) => (
            <MenuItem key={divisionName} value={divisionName}>
              {divisionName}
            </MenuItem>
          ))}
        </TextField>

        {/* 11. FIXED: Department Dropdown */}
        <TextField
          select
          required
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange} // Simple change handler is fine
          error={!!errors.department}
          disabled={!formData.division} // Disable if no division is selected
          helperText={!formData.division ? "Please select a division first" : "Please select a department"}
          fullWidth
        >
          {availableDepartments.map((departmentName) => (
            <MenuItem key={departmentName} value={departmentName}>
              {departmentName}
            </MenuItem>
          ))}
        </TextField>

        {/* 12. FIXED: Position Dropdown */}
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
            value={formData.birth_date ? dayjs(formData.birth_date) : null}
            onChange={(newValue) => {
              setFormData({ ...formData, birth_date: newValue ? newValue.toISOString() : "" });
            }}
            slotProps={{
              textField: {
                required: true,
                error: Boolean(errors.birth_date),
                helperText: errors.birth_date ? errors.birth_date : ""
              },
            }}
          />
        </LocalizationProvider>
        <Button type="submit" variant="contained" size="large">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
