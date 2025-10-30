import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { LeaveRequestType } from "@/app/lib/mockDataLeaveRequest";


export default function LeaveCard({leaveRequest} : {leaveRequest:LeaveRequestType}) {
    return (
    
          <Card sx={{ flexGrow: 1, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
            <Box sx={{display:"flex"}}>
                {leaveRequest.latestStatus}
            </Box>

            </CardContent>
          </Card>

    );


}