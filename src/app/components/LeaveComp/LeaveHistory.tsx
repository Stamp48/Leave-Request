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
      return 'default';
    case 'Modified':
      return 'info';
    case 'เพิกถอน':
      return 'secondary';
    default:
      return 'default';
  }
};

// Helper function to safely format timestamp
const formatTimestamp = (timestamp: any): string => {
  if (!timestamp) return 'No timestamp';
  
  try {
    if (timestamp instanceof Date) {
      return timestamp.toLocaleString();
    }
    return new Date(timestamp).toLocaleString();
  } catch {
    return 'Invalid timestamp';
  }
};

// Helper function to generate a safe key
const generateKey = (item: StatusHistory, index: number): string => {
  if (item.timestamp) {
    try {
      if (item.timestamp instanceof Date) {
        return item.timestamp.toISOString();
      }
      return String(item.timestamp);
    } catch {
      // Fall through to fallback
    }
  }
  return `${item.employeeID}-${index}`;
};

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
              <Box key={generateKey(item, index)}> 
                
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
                
                <Typography variant="body2" color="text.secondary">
                  By: Employee {item.employeeID}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatTimestamp(item.timestamp)}
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