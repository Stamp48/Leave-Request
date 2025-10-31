"use client"
import { StatusHistoryType } from "@/app/lib/mockStatusHistory";
import { useRouter } from "next/navigation"; // 1. Import useRouter
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

export default function LeaveCard({ leaveHistory }: { leaveHistory: StatusHistoryType[] }) {
  const router = useRouter(); // 2. Initialize the router

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
      <CardHeader title={<Typography variant="h4" sx={{paddingTop:"10px"}}>Recent Leave</Typography>} />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: 500, overflowY: 'auto' }}>
          
          {leaveHistory.length === 0 ? (
            <Typography>No leave history found.</Typography>
          ) : (
            leaveHistory.map((item, index) => (
              <Box key={item.timestamp}>
                
                {/* 3. Wrap the content in a clickable Box */}
                <Box
                  onClick={() => router.push(`/leaveRequests/${item.requestId}`)} // Assumes this URL structure
                  sx={{
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '4px',
                    '&:hover': {
                      backgroundColor: 'action.hover' // Theme-aware hover color
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      mb: 1
                    }}
                  >
                    <Typography variant="h6" component="div">
                      Request ID: {item.requestId}
                    </Typography>
                    <Chip 
                      label={item.status} 
                      color={getStatusColor(item.status)} 
                      size="small"
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary">
                    Updated by: Employee {item.employeeId}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(item.timestamp).toLocaleString()}
                  </Typography>
                </Box>
                {/* End of clickable Box */}
                
                {index < leaveHistory.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))
          )}
          
        </Box>
      </CardContent>
    </Card>
  );
}