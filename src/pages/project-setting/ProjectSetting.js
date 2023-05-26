import {useContext, useState} from 'react';
import {styled} from '@mui/material/styles';
import {
  Typography,
  Grid,
  Breadcrumbs,
  Link,
  Button,
  TextField,
} from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import KeyIcon from '@mui/icons-material/Key';
import ShareIcon from '@mui/icons-material/Share';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MemberList from './MemberList';
import WarningPopup from 'src/components/popup/Warning';
import {AppContext} from 'src/Context/AppProvider';
import axios from 'axios';
import {AuthContext} from 'src/Context/AuthProvider';
import {useNavigate} from 'react-router-dom';
import {deleteDocument} from 'src/firebase/firestoreServices';

const GradButton = styled(Button)({
  my: 1,
  backgroundImage:
    'radial-gradient(farthest-corner at -100% 200%, #ffff00, #008000)',
  transition: 'background 2s',
  '&:hover': {
    backgroundImage:
      'radial-gradient(farthest-corner at -100% 200%, #ffff22, #228822)',
  },
});

function ProjectSetting() {
  // const [openLeave, setOpenLeave] = useState(false);
  const {project, setProject, workspace} = useContext(AppContext);
  const {
    user: {uid},
  } = useContext(AuthContext);
  // function handleCloseLeave(email) {
  //   setOpenLeave(false);
  //   setNewOwner(email);
  // }
  const [openDelete, setOpenDelete] = useState(false);
  function handleCloseDelete(result) {
    setOpenDelete(false);
  }

  // const [newOwner, setNewOwner] = useState(false);

  const [rename, setRename] = useState(false);
  const [key, setKey] = useState(false);
  const navigate = useNavigate();

  const handleRename = (e) => {
    e.preventDefault();
    setRename(true);
    setProject({...project, [e.target.name]: e.target.value});
  };

  const handleKey = (e) => {
    e.preventDefault();
    setKey(true);
    setProject({...project, [e.target.name]: e.target.value});
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/project/${project.id}`, project);
      // console.log(workspace);
      // console.log(res);
      setRename(false);
      setKey(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getLastestWorkspace = async () => {
    try {
      const res = await axios.get(`/lastworkspace/${uid}`);
      navigate(`/workspace-setting/${res.data.id}?user=${uid}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`/project/${project.id}`);
      deleteDocument('projects', `${project.id}`);
      console.log(res);
      getLastestWorkspace();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{mb: 2}}>
            <Link
              underline="hover"
              key="1"
              color="inherit"
              href={`/workspace-setting/${project.workspaceId}?user=${uid}`}
              onClick={() => {}}
              sx={{fontFamily: 'Open Sans, sans-serif'}}
            >
              {project.wsname}
            </Link>
            <Link
              underline="hover"
              key="2"
              color="inherit"
              href={`/roadmap/${project.id}`}
              onClick={() => {}}
              sx={{fontFamily: 'Open Sans, sans-serif'}}
            >
              {project.pname}
            </Link>
            <Typography key="3" color="text.primary" sx={{fontSize: 'inherit'}}>
              Project Settings
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Typography
        variant="h5"
        sx={{
          color: 'green',
          fontWeight: 700,
          fontFamily: 'Open Sans, sans-serif',
        }}
      >
        Project Settings
      </Typography>
      <Typography
        sx={{
          display: 'flex',
          color: 'green',
          marginTop: 3,
          marginLeft: 1,
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        <DriveFileRenameOutlineIcon
          sx={{marginRight: 2, width: 24, height: 24}}
        />
        Name
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3} sx={{marginLeft: 6, marginTop: 1, marginBottom: 3}}>
          <TextField
            value={project.pname}
            size="small"
            sx={{
              width: '100%',
              backgroundColor: '#ECECEC',
            }}
            name="pname"
            onChange={handleRename}
            disabled={uid === project.adminId ? false : true}
          ></TextField>
        </Grid>
        {uid === project.adminId && (
          <Grid item xs={3} sx={{marginTop: 1}}>
            {rename && (
              <GradButton
                variant="contained"
                size="medium"
                onClick={handleUpdate}
              >
                Save
              </GradButton>
            )}
          </Grid>
        )}
      </Grid>
      <Typography
        sx={{
          display: 'flex',
          color: 'green',
          marginTop: 2,
          marginLeft: 1,
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        <KeyIcon sx={{marginRight: 2, width: 24, height: 24}} />
        Project Key
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3} sx={{marginLeft: 6, marginTop: 1, marginBottom: 3}}>
          <TextField
            value={project.pkey}
            size="small"
            sx={{
              width: '100%',
              backgroundColor: '#ECECEC',
            }}
            name="pkey"
            onChange={handleKey}
            disabled={uid === project.adminId ? false : true}
          ></TextField>
        </Grid>
        {uid === project.adminId && (
          <Grid item xs={3} sx={{marginTop: 1}}>
            {key && (
              <GradButton
                variant="contained"
                size="medium"
                onClick={handleUpdate}
              >
                Save
              </GradButton>
            )}
          </Grid>
        )}
      </Grid>
      <Typography
        sx={{
          display: 'flex',
          color: 'green',
          marginTop: 2,
          marginLeft: 1,
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        <ShareIcon sx={{marginRight: 2, width: 24, height: 24}} />
        Sharing & Permission
      </Typography>
      {/* <SearchBar sx={{width: '250px', marginLeft: 6, marginTop: 2}} /> */}
      <MemberList />

      {uid === workspace.adminId && (
        <Grid container>
          <Grid item xs={2}>
            <Button
              onClick={() => setOpenDelete(true)}
              variant="text"
              startIcon={
                <DeleteOutlineIcon
                  sx={{marginRight: 1, width: 24, height: 24}}
                />
              }
              sx={{
                color: 'red',
                textTransform: 'none',
                fontSize: 16,
                fontWeight: 700,
                paddingX: 2,
                marginTop: 1,
              }}
            >
              Delete
            </Button>
            <WarningPopup
              open={openDelete}
              onClose={handleCloseDelete}
              title={
                <p>
                  Delete <i>Project 01</i>
                </p>
              }
              content={
                <p>
                  The project along with its issues and documents will be{' '}
                  <b>permanently deleted</b> and <b>cannot</b> be restored.
                </p>
              }
              delContent="Confirm"
              icon
              handleSubmit={handleDelete}
            ></WarningPopup>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default ProjectSetting;
