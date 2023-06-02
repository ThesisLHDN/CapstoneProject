import {useContext, useEffect, useState} from 'react';
import {color, colorHover} from 'src/style';

import {AppContext} from 'src/Context/AppProvider';

import ProjectTable from 'src/components/project-list/ProjectTable';
import AvatarList from './AvatarList';
import axios from 'src/hooks/axios';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {AuthContext} from 'src/Context/AuthProvider';
import WarningPopup from 'src/components/popup/Warning';

import {styled} from '@mui/material/styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import {deleteCollection} from 'src/firebase/firestoreServices';
import {
  Typography,
  Avatar,
  Box,
  TextField,
  Button,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

const StyledTypo = styled(Typography)({
  display: 'block',
  color: color.green03,
  fontWeight: 'bold',
  mb: 2,
});

const StyledAccordion = styled((props) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
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
}));

function WorkspaceSetting() {
  const [delWpPopup, setDelWpPopup] = useState(false);

  const [rename, setRename] = useState(false);
  const [changeDescription, setChangeDescription] = useState(false);
  const {
    user: {uid},
  } = useContext(AuthContext);
  const {workspace, setWorkspace} = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();
  const wsId = location.pathname.split('/')[2];

  const fetchWorkspace = async () => {
    try {
      const res = await axios.get(`/workspace/${wsId}`);
      setWorkspace(res.data);
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
      const res = await axios.put(`/workspace/${wsId}`, workspace);
      setRename(false);
      setChangeDescription(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWorkspace();
  }, [wsId]);

  const getLastestWorkspace = async () => {
    try {
      const res = await axios.get(`/lastworkspace/${uid}`);
      navigate(`/workspace-setting/${res.data.id}?user=${uid}`);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteWorkspaceHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`/workspace/${wsId}`);
      if (res.data) {
        deleteCollection('projects', {
          fieldName: 'workspaceId',
          operator: '==',
          compareValue: wsId,
        });
      }
      getLastestWorkspace();
    } catch (err) {
      console.log(err);
    }
    setDelWpPopup(false);
  };

  return (
    <Box sx={{textAlign: 'left'}}>
      {workspace ? (
        <Box>
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
            </StyledAccordionDetails>
          </StyledAccordion>
          <StyledAccordion>
            <StyledAccordionSummary>
              <StyledTypo>Projects</StyledTypo>
            </StyledAccordionSummary>
            <StyledAccordionDetails sx={{p: 2}}>
              {' '}
              {uid === workspace.adminId && (
                <Button
                  sx={{
                    // width: '155px',
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

                  <Grid
                    item
                    xs={10}
                    sx={{display: 'flex', alignItems: 'center'}}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Avatar
                        alt={
                          workspace.username
                            ? workspace.username
                            : workspace.email
                        }
                        src={workspace.photoURL}
                      />
                      <Typography sx={{mx: 2}}>
                        {' '}
                        {workspace.username
                          ? workspace.username
                          : workspace.email}
                      </Typography>{' '}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Typography sx={{my: 2}}>Members</Typography>
              <AvatarList />
            </StyledAccordionDetails>
          </StyledAccordion>
          {uid === workspace.adminId && (
            <Button
              variant="contained"
              color="error"
              sx={{mx: 2, mt: 1, textTransform: 'none', fontWeight: 'bold'}}
              onClick={() => setDelWpPopup(true)}
            >
              Delete Workspace
            </Button>
          )}
        </Box>
      ) : (
        <Typography>Please select a workspace</Typography>
      )}
      <WarningPopup
        title={'Delete Workspace'}
        open={delWpPopup}
        onClose={() => setDelWpPopup(false)}
        handleSubmit={deleteWorkspaceHandler}
        content={
          'Do you really want to delete this workspace? This action cannot be undone.'
        }
      ></WarningPopup>
    </Box>
  );
}

export default WorkspaceSetting;
