import {useContext, useEffect} from 'react';
import {color} from 'src/style';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Paper,
} from '@mui/material';
import {useNavigate, useLocation} from 'react-router-dom';
import TableCell from '@mui/material/TableCell';
import axios from 'axios';
import {AppContext} from 'src/Context/AppProvider';
import {AuthContext} from 'src/Context/AuthProvider';

export default function ProjectTable() {
  const navigate = useNavigate();
  const {workspace, projects, setProjects} = useContext(AppContext);
  const {
    user: {uid, email},
  } = useContext(AuthContext);
  const location = useLocation();
  const wsId = location.pathname.split('/')[2];

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8800/projects/${wsId}?user=${
          uid === workspace.adminId ? '' : uid
        }`,
      );
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (pid) => {
    try {
      await axios.post('http://localhost:8800/pmember', {
        email: email,
        projectId: pid,
      });
      navigate(`/roadmap/${pid}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [wsId, projects]);

  return (
    <Box>
      {projects.length ? (
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
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="center">Project Type</TableCell>
                  <TableCell align="center">Project owner</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((project) => (
                  <TableRow
                    key={project.id}
                    // component={Link}
                    // to={`/roadmap/${project.id}`}
                    hover
                    onClick={() => handleClick(project.id)}
                    // onClick={() => navigate(`/roadmap/${project.id}`)}
                    sx={{cursor: 'pointer'}}
                  >
                    <TableCell align="left">{project.pname}</TableCell>
                    <TableCell align="center">Scrum Project</TableCell>
                    {project.username ? (
                      <TableCell align="center">{project.username}</TableCell>
                    ) : (
                      <TableCell align="center">{project.email}</TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <div></div>
      )}
    </Box>
  );
}
