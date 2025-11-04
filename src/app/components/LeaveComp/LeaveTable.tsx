// FIXED: Import new snake_case type
import { LeaveRequestType, LeaveStatus } from "@/app/lib/mockDataLeaveRequest"; 
import { useRouter } from "next/navigation";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from "react";
import { ReactNode } from "react";
// NEW: Import Chip for status colors
import Chip from "@mui/material/Chip";


interface Column {
    // FIXED: Use correct keys from LeaveRequestType
    id: keyof LeaveRequestType | 'employee_name'; // Use custom key for name
    label: string;
    minWidth?: number;
    align?: 'right';
}

// FIXED: Columns updated to snake_case and correct logic
const columns: readonly Column[] = [
    { id: 'request_id', label: 'Request ID', minWidth: 50 },
    { id: 'employee_name', label: 'Employee', minWidth: 150 },
    { id: 'employee_division_name', label: 'Division', minWidth: 150 },
    { id: 'leave_type', label: 'Leave Type', minWidth: 100 },
    { id: 'start_date', label: 'Start Date', minWidth: 100 },
    { id: 'end_date', label: 'End Date', minWidth: 100 },
    { id: 'latest_status', label: 'Status', minWidth: 100 },
];

// NEW: Helper function to get a color for the status chip
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

export default function LeaveTable({ rows }: { rows: LeaveRequestType[] }) {

    const router = useRouter();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const fixedTableHeight = 500;
    const rowHeight = 53; 
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, Math.max(0, rows.length - page * rowsPerPage));

    const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // FIXED: formatValue function updated for new columns and status chip
    const formatValue = (column: Column, row: LeaveRequestType): ReactNode => {
        switch (column.id) {
            case 'employee_name':
                return `${row.employee_first_name} ${row.employee_last_name}`;
            
            case 'latest_status':
                return (
                    <Chip 
                        label={row.latest_status}
                        // Use any to allow dynamic color strings from getStatusColor
                        color={getStatusColor(row.latest_status) as any}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                    />
                );

            default:
                // This will handle 'request_id', 'employeeDivisionName', 'leave_type', etc.
                return row[column.id as keyof LeaveRequestType] as ReactNode;
        }
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: fixedTableHeight, height: fixedTableHeight }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell 
                                key={column.id} 
                                align={column.align} 
                                style={{ minWidth: column.minWidth }}
                                sx={column.id === 'request_id' ? { pl: 5 } : undefined}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow
                                    key={row.request_id}
                                    hover
                                    sx={{ cursor: "pointer" }}
                                    // FIXED: Navigate to 'leave-requests' path
                                    onClick={() => router.push(`/leaveRequests/${row.request_id}`)}
                                >
                                    {columns.map((column) => {
                                        return (
                                            <TableCell 
                                            key={column.id} 
                                            align={column.align}
                                            sx={column.id === 'request_id' ? { pl: 5 } : undefined}
                                            >
                                                {formatValue(column, row)}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}

                        {emptyRows > 0 &&
                            Array.from({ length: emptyRows }).map((_, idx) => (
                                <TableRow key={`empty-${idx}`} sx={{ height: rowHeight }}>
                                    <TableCell colSpan={columns.length} />
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length} 
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
