import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { EmployeeType } from "../employees/page";
import { Box } from "@mui/material";

export default function EmployeeCard({employee}: {employee: EmployeeType}) {
    return (
        <Box sx={{ display: "flex", alignItems: "center", maxWidth: 400}}>

        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{height: "100px", width: "100px"}}/>
        <Stack direction={"column"} spacing={0.5} marginLeft={3}>
            <Typography variant="h5">{employee.firstname} {employee.lastname}</Typography>
            <Typography variant="body2" color="text.secondary">{employee.position}</Typography>
            <Typography variant="body2" color="text.secondary">Employee ID: {employee.id}</Typography>
        </Stack>
        </Box>
        );
}