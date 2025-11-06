"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  TextField, Button, Box, MenuItem, Avatar, Stack, IconButton, FormHelperText,
  Typography
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { EmployeeWithNames } from "@/types/employeeWithNames";
import { Position } from "@/types/position";
import { Department } from "@/types/department";

interface NewEmployeeFormData {
  first_name: string;
  last_name: string;
  email: string;
  division: string;
  department: string;
  position: string;
  phone: string;
  birth_date: string;
  address: string;
}

type Errors = Record<string, string>;

const MAX_IMAGE_MB = 2;
const ACCEPT_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

function generateRandomPassword(length = 12) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

export default function AddEmployee({
  orgHierarchyData,
  existingEmployees,
  allPositions,
  allDepartments,
}: {
  orgHierarchyData: Record<string, string[]>;
  existingEmployees: EmployeeWithNames[];
  allPositions: Position[];
  allDepartments: Department[];
}) {
  const router = useRouter();

  const [formData, setFormData] = useState<NewEmployeeFormData>({
    first_name: "",
    last_name: "",
    email: "",
    division: "",
    department: "",
    position: "",
    phone: "",
    birth_date: "",
    address: "",
  });

  const [availableDepartments, setAvailableDepartments] = useState<string[]>(
    []
  );
  const [errors, setErrors] = useState<Errors>({});

  // --- Image upload states ---
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(""); // dataURL

  // release object URL / dataURL if needed
  useEffect(() => {
    return () => {
      // nothing to revoke for dataURL; if using objectURL then URL.revokeObjectURL(url)
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear field error while typing
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDivision = e.target.value;
    const newDepartments = orgHierarchyData[selectedDivision] || [];
    setFormData((prev) => ({
      ...prev,
      division: selectedDivision,
      department: "",
      position: "",
    }));
    setAvailableDepartments(newDepartments);
    setErrors((prev) => ({ ...prev, division: "", department: "", position: "" }));
  };

  // --- Image handlers ---
  const pickImage = () => fileInputRef.current?.click();

  const readFileAsDataURL = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(String(fr.result));
      fr.onerror = reject;
      fr.readAsDataURL(file);
    });

  const handleImageSelected = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // validate type
    if (!ACCEPT_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        profile_picture: "Only JPEG/PNG/WebP/GIF images are allowed.",
      }));
      return;
    }

    // validate size
    const maxBytes = MAX_IMAGE_MB * 1024 * 1024;
    if (file.size > maxBytes) {
      setErrors((prev) => ({
        ...prev,
        profile_picture: `Image must be ≤ ${MAX_IMAGE_MB} MB.`,
      }));
      return;
    }

    // preview
    const dataUrl = await readFileAsDataURL(file);
    setImageFile(file);
    setImagePreview(dataUrl);
    setErrors((prev) => ({ ...prev, profile_picture: "" }));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // --- Validation rules ---
  const nameRegex = /^[A-Za-zก-๙'’\-\s]+$/u; // ไทย/อังกฤษ, เว้นวรรค, ' และ -
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // พอประมาณ (ไม่เคร่งเกินไปสำหรับฟอร์มทั่วไป)
  const phoneRegex = /^[0-9+\-\s]{6,20}$/; // อนุญาต + - เว้นวรรค และตัวเลข ยาวพอสมควร

  const isEmailDuplicate = useMemo(() => {
    const e = formData.email.trim().toLowerCase();
    return existingEmployees.some(
      (emp) => (emp.email || "").trim().toLowerCase() === e
    );
  }, [existingEmployees, formData.email]);

  const validate = () => {
    const temp: Errors = {};

    // First Name / Last Name
    if (!formData.first_name) temp.first_name = "First name is required.";
    else if (!nameRegex.test(formData.first_name))
      temp.first_name = "Only Thai/English letters, spaces, ' and - are allowed.";

    if (!formData.last_name) temp.last_name = "Last name is required.";
    else if (!nameRegex.test(formData.last_name))
      temp.last_name = "Only Thai/English letters, spaces, ' and - are allowed.";

    // Email
    if (!formData.email) temp.email = "Email is required.";
    else if (!emailRegex.test(formData.email))
      temp.email = "Invalid email format.";
    else if (isEmailDuplicate) temp.email = "This email already exists.";

    // Division / Department / Position
    if (!formData.division) temp.division = "Division is required.";
    if (!formData.department) temp.department = "Department is required.";
    if (!formData.position) temp.position = "Position is required.";

    // Phone (optional but if filled, must match)
    if (formData.phone && !phoneRegex.test(formData.phone))
      temp.phone = "Phone must contain digits/+/space/- only.";

    // Birth date
    if (!formData.birth_date) temp.birth_date = "Birth date is required.";
    else {
      const d = dayjs(formData.birth_date);
      if (!d.isValid()) temp.birth_date = "Invalid birth date.";
      else if (d.isAfter(dayjs())) temp.birth_date = "Birth date cannot be in the future.";
      // คุณอาจตรวจอายุขั้นต่ำ/สูงสุดเพิ่มได้ เช่น 15–80 ปี
      // const age = dayjs().diff(d, "year"); if (age < 15 || age > 80) ...
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // ... โค้ดด้านบนเหมือนเดิม

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedPosition = allPositions.find(p => p.positionName === formData.position);
    const position_id = selectedPosition?.positionID ?? 0;

    const selectedDepartment = allDepartments.find(d => d.departmentName === formData.department);
    const department_id = selectedDepartment?.departmentID ?? 0;

    if (!position_id || !department_id) {
      setErrors(prev => ({
        ...prev,
        position: position_id ? "" : "Invalid position",
        department: department_id ? "" : "Invalid department"
      }));
      return;
    }

    const password = generateRandomPassword();

    // ✅ ใช้ FormData
    const fd = new FormData();
    fd.append("email", formData.email);
    fd.append("password", password);
    fd.append("first_name", formData.first_name);
    fd.append("last_name", formData.last_name);
    fd.append("phone", formData.phone || "");
    fd.append("address", formData.address || "");
    fd.append("first_login", "true");
    fd.append("hire_date", dayjs().format("YYYY-MM-DD"));
    fd.append("birth_date", dayjs(formData.birth_date).format("YYYY-MM-DD"));
    fd.append("supervisor_id", ""); // หรือใส่เป็นเลข/เว้นว่าง
    fd.append("department_id", String(department_id));
    fd.append("position_id", String(position_id));

    // ✅ แนบไฟล์จริง (ไม่ใช่ dataURL)
    if (imageFile) {
      fd.append("profile_picture", imageFile, imageFile.name);
    }

    const res = await fetch(`/api/employees`, {
      method: "POST",
      body: fd,               // ❗️อย่าใส่ Content-Type เอง
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error("Create failed:", txt);
      setErrors(prev => ({ ...prev, form: "Create employee failed." }));
      return;
    }

    // สำเร็จ
    router.push("/employees");
  };



  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary.main">
        Add New Employee
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2.5, width: "100%", maxWidth: 480 }}
      >
        {/* Photo Upload */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={imagePreview || "/avatars/default.jpg"}
            sx={{ width: 72, height: 72 }}
            variant="circular"
          />
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              variant="outlined"
              startIcon={<PhotoCameraIcon />}
              onClick={pickImage}
            >
              Upload Photo
            </Button>
            {imagePreview && (
              <IconButton aria-label="remove image" onClick={removeImage}>
                <DeleteOutlineIcon />
              </IconButton>
            )}
          </Stack>
        </Stack>
        {errors.profile_picture && (
          <FormHelperText error>{errors.profile_picture}</FormHelperText>
        )}
        <input
          ref={fileInputRef}
          hidden
          type="file"
          accept={ACCEPT_TYPES.join(",")}
          onChange={handleImageSelected}
        />

        {/* Names */}
        <TextField
          required
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          error={!!errors.first_name}
          helperText={errors.first_name || ""}
        />
        <TextField
          required
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          error={!!errors.last_name}
          helperText={errors.last_name || ""}
        />

        {/* Email */}
        <TextField
          required
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email || ""}
        />

        {/* Division */}
        <TextField
          select
          required
          label="Division"
          name="division"
          value={formData.division}
          onChange={handleDivisionChange}
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

        {/* Department */}
        <TextField
          select
          required
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          error={!!errors.department}
          disabled={!formData.division}
          helperText={
            !formData.division
              ? "Please select a division first"
              : errors.department || "Please select a department"
          }
          fullWidth
        >
          {(orgHierarchyData[formData.division] || []).map((dep) => (
            <MenuItem key={dep} value={dep}>
              {dep}
            </MenuItem>
          ))}
        </TextField>

        {/* Position */}
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
            <MenuItem key={pos.positionID} value={pos.positionName}>
              {pos.positionName}
            </MenuItem>
          ))}
        </TextField>

        {/* Phone */}
        <TextField
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone || ""}
        />

        {/* Address (multiline) */}
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          error={!!errors.address}
          helperText={errors.address || ""}
          multiline
          minRows={3}          // สูงขึ้นหน่อย
          fullWidth
        />


        {/* Birth Date */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Birth Date"
            value={formData.birth_date ? dayjs(formData.birth_date) : null}
            onChange={(newValue) => {
              setFormData({
                ...formData,
                birth_date: newValue ? newValue.toISOString() : "",
              });
              setErrors((prev) => ({ ...prev, birth_date: "" }));
            }}
            slotProps={{
              textField: {
                required: true,
                error: Boolean(errors.birth_date),
                helperText: errors.birth_date ? errors.birth_date : "",
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
