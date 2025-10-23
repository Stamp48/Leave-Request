import { LeaveRequestType } from "@/app/lib/mockDataLeaveRequest";
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
import {calculateLeaveDuration} from "@/app/lib/utils";


interface Column {
    id: keyof LeaveRequestType | 'Duration';
    label: string;
    minWidth?: number;
    align?: 'right';
}



const columns: readonly Column[] = [
    { id: 'requestId', label: 'Request ID', minWidth: 50 },
    { id: 'employeeFirstname', label: 'Employee', minWidth: 150 }, // Changed label to match data
    { id: 'leaveType', label: 'Leave Type', minWidth: 100 },
    { id: 'startDate', label: 'Start Date', minWidth: 100 },
    { id: 'endDate', label: 'End Date', minWidth: 100 },
    { id: 'Duration', label: 'Duration', minWidth: 100 },
    { id: 'latestStatus', label: 'Status', minWidth: 100 },
];

// Corrected prop destructuring to be more standard
export default function LeaveTable({ rows }: { rows: LeaveRequestType[] }) {

    const router = useRouter();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const fixedTableHeight = 500; // px, adjust as needed
    const rowHeight = 53; // approximate row height (adjust if your row styling differs)

    // Corrected to use `rows.length` (since we destructured the prop)
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, Math.max(0, rows.length - page * rowsPerPage));

    const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const formatValue = (column: Column, row: LeaveRequestType): ReactNode => {
        // We pass the whole row in case we need to combine fields,
        // like firstname and lastname.

        switch (column.id) {

            case 'employeeFirstname':
                return `${row.employeeFirstname} ${row.employeeLastname}`;
            case 'Duration':
                return calculateLeaveDuration(row);

            default:
                // Default case just returns the value as-is.
                // We cast to ReactNode to satisfy TypeScript.
                return row[column.id] as ReactNode;
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
                        {/* Corrected to use `rows.slice` */}
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow
                                    key={row.requestId} // Use the unique requestId for the key
                                    hover
                                    sx={{ cursor: "pointer" }}
                                    // Added an example onClick for navigation
                                    onClick={() => router.push(`/leaveRequests/${row.requestId}`)}
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

                        {/* fill remaining space so table height is stable when few rows */}
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
                count={rows.length} // Corrected to use `rows.length`
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
