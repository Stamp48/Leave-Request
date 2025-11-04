"use client"
// FIXED: Import new snake_case types
import { StatusHistoryType } from "@/app/lib/mockStatusHistory";
import { LeaveStatus } from "@/app/lib/mockDataLeaveRequest";
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
export default function LeaveHistory({ history }: { history: StatusHistoryType[] }) {

    return (
        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardHeader title={<Typography variant="h4" sx={{ paddingTop: "10px" }}>Request History</Typography>} />
            <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: 400, overflowY: 'auto' }}>

                    {history.length === 0 ? (
                        <Typography>No status history found.</Typography>
                    ) : (
                        history.map((item, index) => (
                            // Property names (status, employeeId, timestamp) are the same
                            // so this logic remains correct.
                            <Box key={item.timestamp}>

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
                                        // FIXED: Cast to 'any' to allow dynamic color strings
                                        color={getStatusColor(item.status) as any}
                                        size="small"
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                </Box>

                                <Typography variant="body2" color="text.secondary">
                                    By: Employee {item.employee_id}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
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
