import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Detail from "../Detail";
import Box from "@mui/material/Box";
import CardHeader from '@mui/material/CardHeader';
import { EmployeeType } from "@/app/lib/mockDataEmp";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/navigation";


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';








export default function EmployeeDetail({ employee, handleClickOpen, handleClose, open }: { employee: EmployeeType, handleClickOpen?: () => void, handleClose?: () => void, open: boolean }) {
  const router = useRouter();
  return (
    <>
      <Card sx={{ flexGrow: 1, boxShadow: 3, borderRadius: 2 }}>
        <CardHeader
          avatar={<Avatar alt={`${employee.first_name} ${employee.last_name}`}
            src={employee.profile_picture}
            sx={{ width: 150, height: 150, marginTop: "20px", marginLeft: "20px", marginRight: "15px" }}
          />
          }
          title={<Typography variant="h4">{employee.first_name} {employee.last_name}</Typography>}
          subheader={
            <Box>
              <Typography variant="subtitle1">{employee.position}</Typography>
              <Typography variant="subtitle2">Employee ID: {employee.employee_id}</Typography>
            </Box>
          }
        />
        <CardContent>
          <Typography variant="h5" sx={{ marginLeft: "25px" }}>Personal Information</Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
            <Detail label="Email" text={employee.email} />
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
            <Detail label="Division" text={employee.division} />
            <Detail label="Department" text={employee.department} />
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, paddingLeft: "30px", my: "20px" }}>
            <Detail label="Date of Birth" text={employee.birth_date} />
            <Detail label="Start Date" text={employee.hire_date} />
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
              onClick={() => router.push(`/employees/${employee.employee_id}/edit`)}>
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
