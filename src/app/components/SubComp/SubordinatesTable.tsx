'use client'
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
// FIXED: Updated import path and type
import { EmployeeType } from '@/app/lib/mockDataEmp';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';


// ... (Column definition remains the same) ...
interface Column {
    id: keyof EmployeeType | 'fullName';
    label: string;
    minWidth?: number;
    align?: 'right';
}
const columns: readonly Column[] = [
    { id: 'profile_picture', label: 'Profile', minWidth: 100 },
    { id: 'fullName', label: 'Full Name', minWidth: 170 }, // Custom key
    { id: 'email', label: 'Email', minWidth: 200 },
    { id: 'division', label: 'Division', minWidth: 150 }, // Flipped
    { id: 'department', label: 'Department', minWidth: 150 }, // Flipped
];


interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    // This component is now fully controlled by props
    const { onSelectAllClick, numSelected, rowCount } =
        props;


    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick} // Use prop
                        inputProps={{ 'aria-label': 'select all subordinates' }}
                    />
                </TableCell>
                {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                        {column.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>

    );
}
interface EnhancedTableToolbarProps {
    numSelected: number;
    onDelete: () => void; // CHANGED: Simplified onDelete
}
function EnhancedTableToolbar(
    // REMOVED 'selected' prop, it's not needed here
    { numSelected, currEmployee, onDelete }: EnhancedTableToolbarProps & { currEmployee?: EmployeeType }
) {
    // ... (router hook) ...
    const router = useRouter();

    return (
        <Toolbar
            // ... (sx props) ...
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >
            {/* ... (numSelected > 0 logic) ... */}
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                    Subordinates
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    {/* FIXED: Just call onDelete prop directly */}
                    <IconButton onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                // ... (Add icon) ...
                <Tooltip title="Add Supervisor">
                    <IconButton onClick={() => router.push(`/employees/${currEmployee?.employee_id}/subordinates/add-subordinates`)}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}


// NEW: Define all the props being passed from the parent
interface SubordinatesTableProps {
    rows: EmployeeType[];
    currEmployee: EmployeeType;
    onDelete: () => void;
    selected: readonly number[];
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRowClick: (event: React.MouseEvent<unknown>, id: number) => void;
}

export default function SubordinatesTable({
    rows,
    currEmployee,
    onDelete,
    selected, // Use prop
    onSelectAllClick, // Use prop
    onRowClick // Use prop
}: SubordinatesTableProps) { // Use the new interface

    const router = useRouter();
    // REMOVED: const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    // REMOVED: handleSelectAllClick (moved to parent)

    // REMOVED: handleClick (moved to parent)

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    // ... (handleChangeRowsPerPage) ...
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    // ... (emptyRows calculation) ...
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    // ... (visibleRows calculation) ...
    const visibleRows = React.useMemo(
        () => (rows ?? []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [rows, page, rowsPerPage],
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                {/* FIXED: Pass the correct props to the toolbar */}
                <EnhancedTableToolbar
                    numSelected={selected.length} // Use prop
                    currEmployee={currEmployee}
                    onDelete={onDelete} // Use prop
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length} // Use prop
                            onSelectAllClick={onSelectAllClick} // Use prop
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = selected.includes(row.employee_id); // Use prop
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={() => router.push(`/employees/${row.employee_id}`)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.employee_id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                // FIXED: Use onRowClick prop
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onRowClick(e as React.MouseEvent<unknown>, row.employee_id);
                                                }}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        {/* ... (rest of the row cells) ... */}
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            align='left'
                                        >
                                            <Avatar
                                                src={row.profile_picture}
                                                alt={`${row.first_name} ${row.last_name}`}
                                                sx={{ width: 55, height: 55 }}
                                            />
                                        </TableCell>
                                        <TableCell align="left">{row.first_name} {row.last_name}</TableCell>
                                        <TableCell align="left">{row.email}</TableCell>
                                        <TableCell align="left">{row.division}</TableCell>
                                        <TableCell align="left">{row.department}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* ... (TablePagination remains the same) ... */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </Box>
    );
}

