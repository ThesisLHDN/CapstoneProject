import React, {useContext, useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import {
  Typography,
  Grid,
  Breadcrumbs,
  Link,
  Button,
  Dialog,
  TextField,
} from '@mui/material';
import SearchBar from 'src/components/search';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import KeyIcon from '@mui/icons-material/Key';
import ShareIcon from '@mui/icons-material/Share';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MemberList from './MemberList';
import WarningPopup from 'src/components/popup/Warning';
import LeavePopup from 'src/components/popup/LeaveProject';
import {v4 as uuid} from 'uuid';
import {AppContext} from 'src/Context/AppProvider';
import axios from 'axios';
import {AuthContext} from 'src/Context/AuthProvider';
import {useNavigate} from 'react-router-dom';

// const PrivacyButton = styled(Button)({
//   textTransform: 'none',
//   color: 'white',
//   fontSize: 14,
//   fontWeight: 700,
//   backgroundColor: 'red',
//   '&:hover': {
//     backgroundColor: '#F44336',
//   },
// });

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
  const [openLeave, setOpenLeave] = useState(false);
  const {project, setProject, workspace} = useContext(AppContext);
  const {
    user: {uid},
  } = useContext(AuthContext);
  function handleCloseLeave(email) {
    setOpenLeave(false);
    setNewOwner(email);
  }
  const [openDelete, setOpenDelete] = useState(false);
  function handleCloseDelete(result) {
    setOpenDelete(false);
  }

  const [newOwner, setNewOwner] = useState(false);

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
      const res = await axios.put(
        `http://localhost:8800/project/${project.id}`,
        project,
      );
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
      const res = await axios.get(`http://localhost:8800/lastworkspace/${uid}`);
      navigate(`/workspace-setting/${res.data.id}?user=${uid}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `http://localhost:8800/project/${project.id}`,
      );
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
              href="/workspace-setting"
              onClick={() => {}}
              sx={{fontFamily: 'Open Sans, sans-serif'}}
            >
              Dang's Workspace
            </Link>
            <Link
              underline="hover"
              key="2"
              color="inherit"
              href="/roadmap"
              onClick={() => {}}
              sx={{fontFamily: 'Open Sans, sans-serif'}}
            >
              First Scrum Project
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
            disabled={uid == workspace.adminId ? false : true}
          ></TextField>
        </Grid>
        {uid == workspace.adminId && (
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
            disabled={uid == workspace.adminId ? false : true}
          ></TextField>
        </Grid>
        {uid == workspace.adminId && (
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

      {/* <Typography
        sx={{
          marginTop: 2,
          marginLeft: 6,
          fontSize: 16,
          fontWeight: 700,
          display: 'inline-block',
        }}
      >
        Privacy
      </Typography>

      <Typography
        sx={{
          marginTop: 2,
          marginLeft: 3,
          fontSize: 16,
          display: 'inline-block',
        }}
      >
        This project is public to workspace
      </Typography>

      <PrivacyButton
        endIcon={<LockOpenIcon sx={{width: 24, height: 24}} />}
        sx={{marginLeft: 3, padding: 1}}
      >
        Make Public
      </PrivacyButton>

      <Typography
        sx={{
          marginTop: 2,
          marginLeft: 6,
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        Access
      </Typography> */}

      <SearchBar sx={{width: '250px', marginLeft: 6, marginTop: 2}} />
      <MemberList />

      {/* <Grid container>
        <Grid item xs={3}>
          <Button
            onClick={() => setOpenLeave(true)}
            variant="text"
            startIcon={
              <LogoutIcon sx={{marginRight: 1, width: 24, height: 24}} />
            }
            sx={{
              color: 'green',
              textTransform: 'none',
              fontSize: 16,
              fontWeight: 700,
              paddingX: 2,
              marginTop: 1,
            }}
          >
            Leave Project
          </Button>

          <LeavePopup
            open={openLeave}
            onClose={handleCloseLeave}
            projectInfo={{
              projectName: 'First Scrum Project',
              owner: 'dangnguyen@gmail.com',
              members: [
                {
                  id: uuid(),
                  name: 'Lâm Nguyễn',
                  email: 'lamnguyen@gmail.com',
                },
                {
                  id: uuid(),
                  name: 'Đăng Nguyễn',
                  email: 'dangnguyen@gmail.com',
                },
                {
                  id: uuid(),
                  name: 'Hải Nguyễn',
                  email: 'hainguyen@gmail.com',
                },
              ],
            }}
          ></LeavePopup>
        </Grid>
      </Grid> */}

      {uid == workspace.adminId && (
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
