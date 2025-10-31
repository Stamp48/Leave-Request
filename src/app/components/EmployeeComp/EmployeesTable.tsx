import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import { ReactNode } from 'react';
import { useRouter } from "next/navigation";
import { EmployeeType } from "@/app/employees/page";



interface Column {
  id: keyof EmployeeType;
  label: string;
  minWidth?: number;
  align?: 'right';
}



const columns: readonly Column[] = [
  { id: 'avatarUrl', label: 'Profile', minWidth: 100 },
  { id: 'firstname', label: 'Full Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 200 },
  { id: 'department', label: 'Division', minWidth: 150 },
  { id: 'division', label: 'Department', minWidth: 150 },
];


export default function EmployeesTable({ rows }: { rows: EmployeeType[] }) {
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fixedTableHeight = 500; // px, adjust as needed
  const rowHeight = 53; // approximate row height (adjust if your row styling differs)
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, Math.max(0, rows.length - page * rowsPerPage));

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /**
   * Formats the cell value based on the column ID.
   * This is much cleaner than putting logic in the render loop.
   */
  const formatValue = (column: Column, row: EmployeeType): ReactNode => {
    // We pass the whole row in case we need to combine fields,
    // like firstname and lastname.

    switch (column.id) {
      case 'avatarUrl':
        return <Avatar src={row.avatarUrl} alt={`${row.firstname} ${row.lastname}`} />;

      case 'firstname':
        return `${row.firstname} ${row.lastname}`;

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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => router.push(`/employees/${row.id}`)}>
                  {columns.map((column) => {
                    // This is now much simpler and more readable!
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
