"use client";
import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function AddEmployee() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    department: "",
    position: "",
    phone: "",
    hireDate: "",
    birthDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 300,
      }}
    >
      <TextField
        label="Firstname"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        label="Lasttname"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        label="Phone"
        name="phone"
        type="number"
        value={formData.phone}
        onChange={handleChange}
        variant="outlined"
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
}

// interface EmployeeType {
//   id: number;
//   firstname: string;
//   lastname: string;
//   username: string;
//   email: string;
//   department: string;
//   division: string;
//   position: string;
//   phone: string;
//   address: string;
//   avatarUrl: string;
//   hireDate: string;
//   birthDate: string;
//   supervisorId?: number;
// }