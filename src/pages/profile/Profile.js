import {useContext, Suspense, useState, lazy} from 'react';
import {AuthContext} from 'src/Context/AuthProvider';
import {color} from 'src/style';
import {
  Typography,
  Grid,
  TextField,
  Avatar,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';
import {updateDocument} from 'src/firebase/firestoreServices';
import {storage} from 'src/firebase/config';

function Profile() {
  const {
    user: {displayName, email, photoURL, uid},
  } = useContext(AuthContext);

  const [snackbarContent, setSnackbarContent] = useState('');

  const [progress, setProgress] = useState();

  const uploadHandler = async (files) => {
    if (files) {
      let file = files[0];
      console.log('Updating');
      if (file) {
        console.log(file);
        const path = `avatar/${new Date().getTime() + file.name}`;
        const fileRef = ref(storage, path);
        const upLoadTask = uploadBytesResumable(fileRef, file);
        upLoadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            );
            setSnackbarContent('Upload is ' + progress + '% done');
            setProgress(progress);
            if (progress === 100) {
              setProgress();
              setSnackbarContent();
            }
          },
          (err) => {
            console.log(err);
          },
          () => {
            getDownloadURL(upLoadTask.snapshot.ref).then(async (url) => {
              let downloadURL = url;
              if (downloadURL) {
                console.log(
                  `Update avatar from user ${uid} with URL ${downloadURL}`,
                );
                // TODO Update Document
                updateDocument('users', uid, {photoURL: downloadURL});
              }
            });
          },
        );
      }
    }
    return;
  };
  {
    console.log('AAAAAAAAAAAAAAAA', photoURL);
  }
  return (
    <div style={{marginLeft: '-15vw'}}>
      <Typography variant="h5" sx={{color: color.green03, fontWeight: 700}}>
        Account Settings
      </Typography>
      <Suspense fallback={<div>Loading...</div>}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            src={photoURL}
            sx={{
              width: '15vw',
              height: '15vw',
              backgroundColor: '#8993A4',
              fontSize: 120,
            }}
            alt={displayName}
          ></Avatar>
          <Button variant="contained" component="label">
            Change avatar
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={(event) => {
                uploadHandler(event.target.files);
              }}
              onClick={(e) => (e.target.value = null)}
            />
          </Button>
          <CircularProgress variant="determinate" value={progress} />
        </Box>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{mt: 6}}
        >
          <Grid item xs={2}>
            <Typography
              sx={{
                display: 'flex',
                color: color.green03,
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              <DriveFileRenameOutlineIcon
                sx={{marginRight: 2, width: 24, height: 24}}
              />
              Name
            </Typography>
          </Grid>

          <Grid item xs={3.5}>
            <TextField
              hiddenLabel
              value={displayName}
              size="small"
              sx={{width: '100%', backgroundColor: '#ECECEC'}}
            ></TextField>
          </Grid>
        </Grid>

        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{mt: 3}}
        >
          <Grid item xs={2}>
            <Typography
              sx={{
                display: 'flex',
                color: color.green03,
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              <EmailOutlinedIcon sx={{marginRight: 2, width: 24, height: 24}} />
              Email
            </Typography>
          </Grid>

          <Grid item xs={3.5}>
            <TextField
              value={email}
              size="small"
              disabled
              sx={{
                width: '100%',
                backgroundColor: '#ECECEC',
              }}
            ></TextField>
          </Grid>
        </Grid>

        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{mt: 2}}
        >
          {/* <Grid item xs={3}>
              <Button
                variant="text"
                startIcon={
                  <LockOutlinedIcon
                    sx={{marginRight: 1, width: 24, height: 24}}
                  />
                }
                sx={{
                  color: color.green03,
                  textTransform: 'none',
                  fontSize: 16,
                  fontWeight: 700,
                  paddingX: 2,
                  marginTop: 1,
                }}
                onClick={handleClick}
              >
                Change password
              </Button>
            </Grid> */}
          <Grid item xs={2.75}></Grid>
        </Grid>

        {/* <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{mt: 2}}
          >
            <Grid item xs={3}>
              <Button
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
                Log out
              </Button>
            </Grid>
            <Grid item xs={2.75}></Grid>
          </Grid> */}
      </Suspense>
    </div>
  );
}

export default Profile;
