import React from 'react'
import { 
    Checkbox, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TablePagination, 
    TableRow, 
    Typography 
} from '@material-ui/core'

const ListVehicles = ({ data, onPageSizeChange, onRefreshData, pageSizes, total }) => {

    return (
        !data ? null : 
        <Paper>
            <Typography variant="subtitle1" id="tableTitle">
                All Vehicles
            </Typography>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Checkbox
                                    inputProps={{ 'aria-label': 'select all vehicles' }}
                                />
                            </TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Manufacturer</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell>Fuel Type</TableCell>
                            <TableCell>Transmission</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(row => (
                        <TableRow hover key={row.id}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                />
                            </TableCell>
                            <TableCell>
                                {row.name}
                            </TableCell>
                            <TableCell>
                                {row.manufacturer}
                            </TableCell>
                            <TableCell>
                                {row.year}
                            </TableCell>
                            <TableCell>
                                {row.fuel}
                            </TableCell>
                            <TableCell>
                                {row.transmission}
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <TablePagination
                rowsPerPageOptions={pageSizes}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            /> */}
        </Paper>
    )
}

export default ListVehicles
