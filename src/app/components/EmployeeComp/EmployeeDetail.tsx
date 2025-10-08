import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Detail from "../Detail";
import Box from "@mui/material/Box";
import CardHeader from '@mui/material/CardHeader';
import EmployeeCard from "./EmployeeCard";
import { EmployeeType } from "../../employees/page";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/navigation";







export default function EmployeeDetail({ employee }: { employee: EmployeeType }) {
  const router = useRouter();
  return (
    <>
      <Card sx={{ flexGrow: 1, boxShadow: 3, borderRadius: 2 }}>
        <CardHeader
          avatar={<Avatar alt={`${employee.firstname} ${employee.lastname}`}
            src={employee.avatarUrl}
            sx={{ width: 150, height: 150, marginTop: "20px", marginLeft: "20px", marginRight: "15px" }}
          />
          }
          title={<Typography variant="h4">{employee.firstname} {employee.lastname}</Typography>}
          subheader={
            <Box>
              <Typography variant="subtitle1">{employee.position}</Typography>
              <Typography variant="subtitle2">Employee ID: {employee.id}</Typography>
            </Box>
          }
        />
        <CardContent>
          <Typography variant="h5" sx={{ marginLeft: "25px" }}>Personal Information</Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
            <Detail label="Username" text={employee.username} />
            <Detail label="Email" text={employee.email} />
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
            <Detail label="Department" text={employee.department} />
            <Detail label="Division" text={employee.division} />
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
            <Detail label="Date of Birth" text={employee.birthDate} />
            <Detail label="Start Date" text={employee.hireDate} />
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
            <Detail label="Phone" text={employee.phone} />
          </Box>


        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => router.push(`/employees/${employee.id}/edit`)}>Edit</Button>
          <Button size="small">Delete</Button>
        </CardActions>
      </Card>
    </>
  );
}
