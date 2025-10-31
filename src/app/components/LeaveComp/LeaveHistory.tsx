"use client"
import { StatusHistoryType } from "@/app/lib/mockStatusHistory";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

// Helper function to get a color for the status chip
const getStatusColor = (status: 'Pending' | 'Approved' | 'Rejected') => {
  switch (status) {
    case 'Approved':
      return 'success';
    case 'Rejected':
      return 'error';
    case 'Pending':
    default:
      return 'warning';
  }
};

// 1. Accept the 'history' prop (which is an array: StatusHistoryType[])
export default function LeaveHistory({ history }: { history: StatusHistoryType[] }) {
  
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
      <CardHeader title={<Typography variant="h4" sx={{paddingTop:"10px"}}>Request History</Typography>} />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: 400, overflowY: 'auto' }}>
          
          {/* 2. Check if the list is empty */}
          {history.length === 0 ? (
            <Typography>No status history found.</Typography>
          ) : (
            // 3. Loop over the history array here
            history.map((item, index) => (
              <Box key={item.timestamp}> {/* Use timestamp as the key */}
                
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: 1
                  }}
                >
                  {/* We don't need the Request ID, just the status */}
                  <Typography variant="h6" component="div">
                    {item.status}
                  </Typography>
                  <Chip 
                    label={item.status} 
                    color={getStatusColor(item.status)} 
                    size="small"
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  By: Employee {item.employeeId}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(item.timestamp).toLocaleString()}
                </Typography>

                {/* 4. Add a divider unless it's the last item */}
                {index < history.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))
          )}
          
        </Box>
      </CardContent>
    </Card>
  );
}