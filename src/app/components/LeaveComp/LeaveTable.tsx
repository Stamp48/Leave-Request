import { LeaveRequest } from "@/types/leaveRequest"; 
import { LeaveStatus } from "@/types/leaveStatus";
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
import Chip from "@mui/material/Chip";

interface Column {
    // FIXED: Use correct keys from LeaveRequest type
    id: keyof LeaveRequest | 'employeeName'; // Use custom key for name
    label: string;
    minWidth?: number;
    align?: 'right';
}

// FIXED: Columns updated to camelCase
const columns: readonly Column[] = [
    { id: 'requestID', label: 'Request ID', minWidth: 50 },
    { id: 'employeeName', label: 'Employee', minWidth: 150 },
    { id: 'employeeDivisionName', label: 'Division', minWidth: 150 },
    { id: 'leaveType', label: 'Leave Type', minWidth: 100 },
    { id: 'startDate', label: 'Start Date', minWidth: 100 },
    { id: 'endDate', label: 'End Date', minWidth: 100 },
    { id: 'latestStatus', label: 'Status', minWidth: 100 },
];

// This helper is already correct for the camelCase type
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

export default function LeaveTable({ rows }: { rows: LeaveRequest[] }) { // FIXED: Use real type

    const router = useRouter();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // ... (other state remains the same) ...
    const fixedTableHeight = 500;
    const rowHeight = 53; 
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, Math.max(0, rows.length - page * rowsPerPage));

    const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // FIXED: formatValue function updated for camelCase
    const formatValue = (column: Column, row: LeaveRequest): ReactNode => {
        switch (column.id) {
            case 'employeeName':
                // FIXED: Use camelCase
                return `${row.employeeFirstName} ${row.employeeLastName}`;
            
            case 'latestStatus':
                // FIXED: Use camelCase
                return (
                    <Chip 
                        label={row.latestStatus} 
                        color={getStatusColor(row.latestStatus) as any}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                    />
                );
            
            // FIXED: Format Date objects
            case 'startDate':
                return new Date(row.startDate).toLocaleDateString();
            case 'endDate':
                return new Date(row.endDate).toLocaleDateString();

            default:
                // This will handle 'requestID', 'employeeDivisionName', 'leaveType'
                return row[column.id as keyof LeaveRequest] as ReactNode;
        }
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: fixedTableHeight, height: fixedTableHeight }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
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
                                    key={row.requestID} // FIXED: Use camelCase
                                    hover
                                    sx={{ cursor: "pointer" }}
                                    // FIXED: Use camelCase
                                    onClick={() => router.push(`/leaveRequests/${row.requestID}`)}
                                >
                                    {columns.map((column) => {
                                        return (
                                            <TableCell key={column.id} align={column.align}>
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