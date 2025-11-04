"use client"
// FIXED: Import new snake_case types
import { StatusHistoryType } from "@/app/lib/mockStatusHistory";
import { LeaveStatus } from "@/app/lib/mockDataLeaveRequest";
import { useRouter } from "next/navigation"; 
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
    case 'Approved':
      return 'success';
    case 'Rejected':
      return 'error';
    case 'Pending':
      return 'warning';
    case 'Canceled':
      return 'default'; // Gray
    case 'Modified':
      return 'info'; // Blue
    case 'Revoked':
      return 'secondary'; // Purple
    default:
      return 'default';
  }
};

// FIXED: Use the new StatusHistoryType
export default function LeaveCard({ leaveHistory }: { leaveHistory: StatusHistoryType[] }) {
  const router = useRouter(); // 2. Initialize the router

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
      <CardHeader title={<Typography variant="h4" sx={{ paddingTop: "10px" }}>Recent Leave</Typography>} />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: 500, overflowY: 'auto' }}>

          {leaveHistory.length === 0 ? (
            <Typography>No leave history found.</Typography>
          ) : (
            leaveHistory.map((item, index) => (
              <Box key={item.timestamp}>

                {/* 3. Wrap the content in a clickable Box */}
                <Box
                  // FIXED: Update to snake_case path and property
                  onClick={() => router.push(`/leave-requests/${item.request_id}`)} 
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
                      {/* FIXED: Use property from new type */}
                      Request ID: {item.request_id} 
                    </Typography>
                    <Chip
                      label={item.status}
                      // FIXED: Cast to 'any' to allow dynamic color strings
                      color={getStatusColor(item.status) as any} 
                      size="small"
                      sx={{ textTransform: 'capitalize' }} // Added for consistency
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    {/* FIXED: Use property from new type */}
                    Updated by: Employee {item.employee_id} 
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
