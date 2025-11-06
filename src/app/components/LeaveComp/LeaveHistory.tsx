"use client"
// FIXED: Import real UI types
import { StatusHistory } from "@/types/statusHistory";
import { LeaveStatus } from "@/types/leaveStatus";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

// FIXED: Helper function to get a color for all new statuses
const getStatusColor = (status: LeaveStatus) => {
  switch (status) {
    case 'อนุมัติ':
      return 'success';
    case 'ปฏิเสธ':
      return 'error';
    case 'รออนุมัติ':
      return 'warning';
    case 'Canceled':
      return 'default'; // Gray
    case 'Modified':
      return 'info'; // Blue
    case 'เพิกถอน':
      return 'secondary'; // Purple
    default:
      return 'default';
  }
};

// FIXED: Use the new StatusHistory type
export default function LeaveHistory({ history }: { history: StatusHistory[] }) {
  
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
      <CardHeader title={<Typography variant="h4" sx={{paddingTop:"10px"}}>Request History</Typography>} />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: 400, overflowY: 'auto' }}>
          
          {history.length === 0 ? (
            <Typography>No status history found.</Typography>
          ) : (
            history.map((item, index) => (
              // FIXED: Use camelCase timestamp (which is a Date object)
              <Box key={item.timestamp.toISOString()}> 
                
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: 1
                  }}
                >
                  <Typography variant="h6" component="div">
                    {item.status}
                  </Typography>
                  <Chip 
                    label={item.status}
                    color={getStatusColor(item.status) as any} 
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </Box>
                
                {/* FIXED: Use camelCase */}
                <Typography variant="body2" color="text.secondary">
                  By: Employee {item.employeeID}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {/* FIXED: Format Date object */}
                  {new Date(item.timestamp).toLocaleString()}
                </Typography>

                {index < history.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))
          )}
          
        </Box>
      </CardContent>
    </Card>
  );
}