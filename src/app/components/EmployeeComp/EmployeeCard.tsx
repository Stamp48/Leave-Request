import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { EmployeeWithNames } from "@/types/employeeWithNames";

export default function EmployeeCard({ employee }: { employee: EmployeeWithNames}) {
    return (
        <Box sx={{ display: "flex", alignItems: "center", maxWidth: 400 }}>

            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ height: "100px", width: "100px" }} />
            <Stack direction={"column"} spacing={0.5} marginLeft={3}>
                <Typography variant="h5">{employee.firstName} {employee.lastName}</Typography>
                <Typography variant="body2" color="text.secondary">{employee.positionName}</Typography>
                <Typography variant="body2" color="text.secondary">Employee ID: {employee.employeeID}</Typography>
            </Stack>
        </Box>
    );
}