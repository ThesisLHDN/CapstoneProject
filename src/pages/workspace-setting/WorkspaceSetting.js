import {useContext, useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import {color, colorHover} from 'src/style';

import {
  Typography,
  Avatar,
  Box,
  TextField,
  Button,
  Grid,
  Accordion,
  AccordionSummary,
  IconButton,
  AccordionDetails,
  Dialog,
} from '@mui/material';
// import MuiAccordion from '@mui/material/Accordion';
// import MuiAccordionSummary from '@mui/material/AccordionSummary';
// import MuiAccordionDetails from '@mui/material/AccordionDetails';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import ProjectTable from 'src/components/project-list/ProjectTable';
import AvatarList from './AvatarList';
import axios from 'axios';
import {Link, useLocation} from 'react-router-dom';
import {AppContext} from 'src/Context/AppProvider';
import {AuthContext} from 'src/Context/AuthProvider';

const StyledTypo = styled(Typography)({
  // backgroundColor: color.green03,
  display: 'block',
  // padding: '8px 16px',
  color: color.green03,
  fontWeight: 'bold',
  mb: 2,
});

const StyledAccordion = styled((props) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
  //   border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const StyledAccordionSummary = styled((props) => (
  <AccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{fontSize: '0.9rem', color: color.green03}}
      />
    }
    {...props}
  />
))(({theme}) => ({
  backgroundColor: 'rgba(0, 0, 0, 0)',
  // theme.palette.mode === "dark"
  //   ? "rgba(255, 255, 255, .05)"
  //   : "rgba(0, 0, 0, .03)",
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({theme}) => ({
  padding: theme.spacing(2),
  //   borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function WorkspaceSetting() {
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [rename, setRename] = useState(false);
  const [changeDescription, setChangeDescription] = useState(false);
  // const [admin, setAdmin] = useState({});
  const {
    user: {uid},
  } = useContext(AuthContext);
  const {workspace, setWorkspace, admin, setAdmin} = useContext(AppContext);

  const location = useLocation();
  const wsId = location.pathname.split('/')[2];

  const fetchWorkspace = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/workspace/${wsId}`);
      setWorkspace(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAdmin = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/admin/${wsId}`);
      console.log(res.data);
      setAdmin(res.data);
      // console.log('AAAAAAAA', res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRename = (e) => {
    e.preventDefault();
    setRename(true);
    setWorkspace({...workspace, [e.target.name]: e.target.value});
  };

  const handleChangeDescription = (e) => {
    e.preventDefault();
    setChangeDescription(true);
    setWorkspace({...workspace, [e.target.name]: e.target.value});
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8800/workspace/${wsId}`,
        workspace,
      );
      // console.log(workspace);
      // console.log(res);
      setRename(false);
      setChangeDescription(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWorkspace();
    fetchAdmin();
  }, [wsId]);

  return (
    <Box sx={{textAlign: 'left'}}>
      <Typography
        variant="h5"
        sx={{mb: 2, color: color.green03, fontWeight: 700}}
      >
        Workspace Setting
      </Typography>
      <StyledAccordion>
        <StyledAccordionSummary>
          {' '}
          <StyledTypo>Workspace details</StyledTypo>
        </StyledAccordionSummary>
        <StyledAccordionDetails sx={{p: 2}}>
          <Grid container spacing={2} sx={{alignItems: 'center'}}>
            <Grid item xs={2}>
              <Typography sx={{my: 2}}>Name:</Typography>
            </Grid>
            <Grid item xs={5}>
              <TextField
                value={workspace.wsname}
                name="wsname"
                onChange={handleRename}
                disabled={uid === workspace.adminId ? false : true}
                size="small"
                sx={{
                  width: '100%',
                  border: '0px',
                  backgroundColor: '#efefef',
                }}
              ></TextField>
            </Grid>
            <Grid item xs={5}>
              {uid === workspace.adminId && rename && (
                <Button
                  variant="contained"
                  size="medium"
                  sx={{...colorHover.greenGradBtn}}
                  onClick={handleUpdate}
                >
                  Save
                </Button>
              )}
            </Grid>
          </Grid>
          <Typography sx={{my: 2}}>Description:</Typography>
          <TextField
            sx={{
              width: '100%',
              scrollbarGutter: 'stable',
              textAlign: 'justify',
              '& textarea': {
                textAlign: 'justify',
              },
            }}
            onChange={handleChangeDescription}
            name="descript"
            multiline
            rows={2}
            value={workspace.descript ? workspace.descript : ''}
            disabled={uid === workspace.adminId ? false : true}
          ></TextField>
        </StyledAccordionDetails>
      </StyledAccordion>
      <StyledAccordion>
        <StyledAccordionSummary>
          <StyledTypo>Projects</StyledTypo>
        </StyledAccordionSummary>
        <StyledAccordionDetails sx={{p: 2}}>
          {' '}
          {uid === workspace.adminId && changeDescription && (
            <Button
              variant="contained"
              size="medium"
              sx={{mt: 2, ...colorHover.greenGradBtn}}
              onClick={handleUpdate}
            >
              Update description
            </Button>
          )}
          {uid === workspace.adminId && (
            <Button
              sx={{
                width: '155px',
                height: '38px',
                ...colorHover.greenGradBtn,
              }}
              variant="contained"
              startIcon={<AddRoundedIcon />}
            >
              <Link to="/create-project" state={{background: location}}>
                Create project
              </Link>
            </Button>
          )}
          <ProjectTable />
        </StyledAccordionDetails>
      </StyledAccordion>
      <StyledAccordion>
        <StyledAccordionSummary>
          <StyledTypo>People</StyledTypo>
        </StyledAccordionSummary>

        <StyledAccordionDetails sx={{p: 2}}>
          {' '}
          <Grid container spacing={2}>
            <Grid container item>
              <Grid item xs={2}>
                <Typography sx={{my: 2}}>Administrator</Typography>
              </Grid>

              <Grid item xs={10} sx={{display: 'flex', alignItems: 'center'}}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    alt={admin.username ? admin.username : admin.email}
                    src="#"
                  />
                  <Typography sx={{mx: 2}}>
                    {' '}
                    {admin.username ? admin.username : admin.email}
                  </Typography>{' '}
                  {/* <IconButton>
                      <EditRoundedIcon />
                    </IconButton> */}
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Typography sx={{my: 2}}>Members</Typography>
          <AvatarList />
        </StyledAccordionDetails>
      </StyledAccordion>
      <Button
        variant="contained"
        color="error"
        sx={{mx: 2, mt: 1, textTransform: 'none', fontWeight: 'bold'}}
      >
        Delete Workspace
      </Button>
    </Box>
  );
}

export default WorkspaceSetting;
