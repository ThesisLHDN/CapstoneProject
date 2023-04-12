import {useContext, useEffect, useState} from 'react';
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
  // TablePagination,
} from '@mui/material';
import {Link, useLocation, useNavigate} from 'react-router-dom';
// import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';

import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import axios from 'axios';
import useSWR from 'swr';
import {AppContext} from 'src/Context/AppProvider';
import {AuthContext} from 'src/Context/AuthProvider';

function createData(name, type, owner) {
  return {name, type, owner};
}

// const rows = [
//   createData(
//     'First Scrum Project',
//     'Scrum project',
//     'Nguyễn Trường Hải Đăng',
//   ),
//   createData(
//     'First Kanban Project',
//     'Kanban project',
//     'Nguyễn Hoàng Lâm',
//   ),
//   createData(
//     'Second Scrum Project',
//     'Scrum project',
//     'Nguyễn Hoàng Lâm',
//   ),
// ];

// const columns = [
//   {id: 'name', label: 'Name', minWidth: 170},
//   {id: 'code', label: 'ISO\u00a0Code', minWidth: 100},
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),
//   },
// ];

export default function ProjectTable() {
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };
  const {workspace, projects, setProjects} = useContext(AppContext);
  // console.log('reload')
  // console.log('project list', projects)
  // console.log(workspace);
  const {
    user: {displayName, uid},
  } = useContext(AuthContext);
  const location = useLocation();
  const wsId = location.pathname.split('/')[2];
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8800/projects/${wsId}?user=${
          uid == workspace.adminId ? '' : uid
        }`,
      );
      // console.log(res.data);
      setProjects(res.data);
      //return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [wsId, projects]);

  // console.log(projects);

  // const {data, error} = useSWR('projects', fetchProjects);
  // if (!data) return <h2>Loading...</h2>;

  return (
    <Paper sx={{overflow: 'hidden', mt: 2}}>
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
              {/* <TableCell></TableCell> */}
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Project Type</TableCell>
              <TableCell align="center">Project owner</TableCell>
              {/* <TableCell align="center"></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow
                key={project.id}
                component={Link}
                to={`/roadmap/${project.id}`}
                hover
              >
                {/* <TableCell scope="row">
                  <IconButton>
                    {row.star ? (
                      <StarRoundedIcon sx={{ color: '#ffbf00' }} />
                    ) : (
                      <StarBorderRoundedIcon />
                    )}
                  </IconButton>
                </TableCell> */}
                <TableCell align="left">{project.pname}</TableCell>
                <TableCell align="center">Scrum Project</TableCell>
                {project.username ? (
                  <TableCell align="center">{project.username}</TableCell>
                ) : (
                  <TableCell align="center">{project.email}</TableCell>
                )}

                {/* <TableCell align="center">
                  <IconButton>
                    <EditRoundedIcon />
                  </IconButton>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
