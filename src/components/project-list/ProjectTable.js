import * as React from 'react';
// import {styled} from '@mui/material/styles';
import {color} from 'src/style';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
} from '@mui/material';
import {Link} from 'react-router-dom';
// import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';

import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

// const StyledTableCell = styled(TableCell)(({theme}) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: color.green03,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({theme}) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

function createData(star, name, type, owner) {
  return {star, name, type, owner};
}

const rows = [
  createData(
    true,
    'First Scrum Project',
    'Scrum project',
    'Nguyễn Trường Hải Đăng',
  ),
  createData(
    false,
    'First Kanban Project',
    'Kanban project',
    'Nguyễn Hoàng Lâm',
  ),
  createData(
    false,
    'Second Scrum Project',
    'Scrum project',
    'Nguyễn Hoàng Lâm',
  ),
];

const columns = [
  {id: 'name', label: 'Name', minWidth: 170},
  {id: 'code', label: 'ISO\u00a0Code', minWidth: 100},
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

export default function ProjectTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{overflow: 'hidden', my: 2}}>
      <TableContainer>
        <Table sx={{minWidth: 700}} aria-label="customized table">
          <TableHead
            sx={{
              backgroundColor: color.green03,
              '& .MuiTableCell-root.MuiTableCell-head': {
                color: 'white',
                fontWeight: 700,
              },
            }}
          >
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Project Type</TableCell>
              <TableCell align="center">Project owner</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} component={Link} to="/roadmap" hover>
                <TableCell scope="row">
                  <IconButton>
                    {row.star ? (
                      <StarRoundedIcon sx={{color: '#ffbf00'}} />
                    ) : (
                      <StarBorderRoundedIcon />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">{row.owner}</TableCell>
                <TableCell align="center">
                  <IconButton>
                    <EditRoundedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
