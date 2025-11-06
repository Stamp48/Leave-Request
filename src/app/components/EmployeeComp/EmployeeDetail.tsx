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


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { EmployeeWithNames } from "@/types/employeeWithNames";

const formatDate = (d: Date | string | null | undefined) => {
  if (!d) return "-";
  const date = d instanceof Date ? d : new Date(d);
  return date.toISOString().slice(0, 10);
};

export default function EmployeeDetail({ employee, handleClickOpen, handleClose, open }: { employee: EmployeeWithNames, handleClickOpen?: () => void, handleClose?: () => void, open: boolean }) {
  console.log(employee)
  const router = useRouter();
  return (
    <>
      <Card sx={{ flexGrow: 1, boxShadow: 3, borderRadius: 2 }}>
        <CardHeader
          avatar={<Avatar alt={`${employee.firstName} ${employee.lastName}`}
            src={employee.profilePicture ?? undefined}
            sx={{ width: 150, height: 150, marginTop: "20px", marginLeft: "20px", marginRight: "15px" }}
          />
          }
          title={<Typography variant="h4">{employee.firstName} {employee.lastName}</Typography>}
          subheader={
            <Box>
              <Typography variant="subtitle1">{employee.positionName}</Typography>
              <Typography variant="subtitle2">Employee ID: {employee.employeeID}</Typography>
            </Box>
          }
        />
        <CardContent>
          <Typography variant="h5" sx={{ marginLeft: "25px" }}>Personal Information</Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
            <Detail label="Email" text={employee.email} />
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
            <Detail label="Division" text={employee.divisionName} />
            <Detail label="Department" text={employee.departmentName} />
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
            <Detail label="Date of Birth" text={formatDate(employee.birthDate)} />
            <Detail label="Start Date" text={formatDate(employee.hireDate)} />
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
            <Detail label="Address" text={employee.address} />
            <Detail label="Phone" text={employee.phone} />
          </Box>


        </CardContent>
        <CardActions>
          <Box sx={{ paddingLeft: "25px" , paddingBottom:"25px"}}>
            <Button variant="outlined"
              size="small" sx={{ marginRight: "7.5px"  }}
              onClick={() => router.push(`/employees/${employee.employeeID}/edit`)}>
              Edit
            </Button>
            <React.Fragment>
              <Button variant="outlined" color="error" size="small" onClick={handleClickOpen}>
                Delete
              </Button>

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Confirm Employee Deletion"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this employee? This action is permanent and cannot be undone.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Disagree</Button>
                  <Button onClick={handleClose} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
          </Box>

        </CardActions>
      </Card>
    </>
  );
}
