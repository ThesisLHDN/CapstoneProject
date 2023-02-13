import React, {useState} from 'react';
import {styled} from '@mui/material/styles';
import {
  Typography,
  Grid,
  Breadcrumbs,
  Link,
  Button,
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

const PrivacyButton = styled(Button)({
  textTransform: 'none',
  color: 'white',
  fontSize: 14,
  fontWeight: 700,
  backgroundColor: 'red',
  '&:hover': {
    backgroundColor: '#F44336',
  },
});

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
  const [rename, setRename] = useState(false);
  const [key, setKey] = useState(false);
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
        Rename
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={3} sx={{marginLeft: 6, marginTop: 1, marginBottom: 3}}>
          <TextField
            defaultValue="First Scrum Project"
            size="small"
            sx={{
              width: '100%',
              backgroundColor: '#ECECEC',
            }}
            onChange={() => setRename(true)}
          ></TextField>
        </Grid>
        <Grid item xs={3} sx={{marginTop: 1}}>
          {rename && (
            <GradButton variant="contained" size="medium">
              Save
            </GradButton>
          )}
        </Grid>
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
            defaultValue="FSP"
            size="small"
            sx={{
              width: '100%',
              backgroundColor: '#ECECEC',
            }}
            onChange={() => setKey(true)}
          ></TextField>
        </Grid>
        <Grid item xs={3} sx={{marginTop: 1}}>
          {key && (
            <GradButton variant="contained" size="medium">
              Save
            </GradButton>
          )}
        </Grid>
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

      <Typography
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
      </Typography>

      <SearchBar sx={{width: '250px', marginLeft: 6, marginTop: 2}} />
      <MemberList />

      <Grid container>
        <Grid item xs={3}>
          <Button
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
      </Grid>

      <Grid container>
        <Grid item xs={2}>
          <Button
            variant="text"
            startIcon={
              <DeleteOutlineIcon sx={{marginRight: 1, width: 24, height: 24}} />
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
          ></WarningPopup>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProjectSetting;
