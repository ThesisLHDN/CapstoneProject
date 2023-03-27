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
import Dashboard from 'src/components/Dashboard';
import CreateProject from 'src/components/popup/CreateProject';
import axios from 'axios';
import {Link, useLocation} from 'react-router-dom';
import useSWR from 'swr';
import {AppContext} from 'src/Context/AppProvider';

const StyledTypo = styled(Typography)({
  color: color.green03,
  fontWeight: 'bold',
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
  const {workspace, setWorkspace} = useContext(AppContext);

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

  const handleRename = (e) => {
    e.preventDefault();
    setRename(true);
    setWorkspace({...workspace, [e.target.name]: [e.target.value]});
  };

  const handleChangeDescription = (e) => {
    e.preventDefault();
    setChangeDescription(true);
    setWorkspace({...workspace, [e.target.name]: [e.target.value]});
  };

  useEffect(() => {
    fetchWorkspace();
  }, []);

  return (
    <div style={{textAlign: 'left'}}>
      <Typography variant="h5" sx={{color: color.green03, fontWeight: 700}}>
        Workspace Setting
      </Typography>
      <Box sx={{my: 2}}>
        <StyledAccordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <StyledAccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <StyledTypo>Workspace details</StyledTypo>
          </StyledAccordionSummary>
          <StyledAccordionDetails>
            <Grid container spacing={2} sx={{alignItems: 'center'}}>
              <Grid item xs={2}>
                <Typography sx={{my: 2}}>Name:</Typography>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  value={workspace.wsname}
                  name="wsname"
                  onChange={handleRename}
                  size="small"
                  sx={{
                    width: '100%',
                    border: '0px',
                    backgroundColor: '#efefef',
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={5}>
                {rename && (
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{...colorHover.greenGradBtn}}
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
              value={workspace.descript}
            ></TextField>
            {changeDescription && (
              <Button
                variant="contained"
                size="medium"
                sx={{mt: 2, ...colorHover.greenGradBtn}}
              >
                Update description
              </Button>
            )}
          </StyledAccordionDetails>
        </StyledAccordion>
        <StyledAccordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <StyledAccordionSummary
            aria-controls="panel2d-content"
            id="panel2d-header"
            sx={{
              // display: 'flex',
              width: '100%',
              position: 'relative',
              // justifyContent: 'space-between',
            }}
          >
            <StyledTypo>Projects</StyledTypo>{' '}
          </StyledAccordionSummary>
          <StyledAccordionDetails sx={{position: 'relative'}}>
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
            {/* <CreateProject /> */}
            <ProjectTable />
          </StyledAccordionDetails>
        </StyledAccordion>
        <StyledAccordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
        >
          <StyledAccordionSummary
            aria-controls="panel3d-content"
            id="panel3d-header"
            sx={{position: 'relative'}}
          >
            <StyledTypo>People</StyledTypo>
          </StyledAccordionSummary>
          <StyledAccordionDetails>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  sx={{
                    // position: 'absolute',
                    // right: 0,
                    // top: '50%',
                    // transform: 'translateY(-50%)',
                    ...colorHover.greenGradBtn,
                  }}
                  variant="contained"
                  startIcon={<PersonAddAltRoundedIcon />}
                >
                  Add members
                </Button>
              </Grid>

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
                    <Avatar alt="Remy Sharp" src="#" />
                    <Typography sx={{mx: 2}}>
                      {' '}
                      Nguyễn Trường Hải Đăng
                    </Typography>{' '}
                    <IconButton>
                      <EditRoundedIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Typography sx={{my: 2}}>Members</Typography>
            <AvatarList />
          </StyledAccordionDetails>
        </StyledAccordion>
        {/* <StyledAccordion
          expanded={expanded === 'panel4'}
          onChange={handleChange('panel4')}
        >
          <StyledAccordionSummary
            aria-controls="panel3d-content"
            id="panel3d-header"
          >
            <StyledTypo>Dashboard</StyledTypo>
          </StyledAccordionSummary>
          <StyledAccordionDetails>
            <Dashboard />
          </StyledAccordionDetails>
        </StyledAccordion> */}
      </Box>
    </div>
  );
}

export default WorkspaceSetting;
