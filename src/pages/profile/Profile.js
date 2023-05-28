import {useContext, Suspense, useState} from 'react';
import {AuthContext} from 'src/Context/AuthProvider';

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
import {updateAuthFirestore} from 'src/firebase/firestoreServices';
import {storage} from 'src/firebase/config';
import {colorHover, color} from 'src/style';
import axios from 'src/hooks/axios';

function Profile() {
  const {
    user: {displayName, email, photoURL, uid},
  } = useContext(AuthContext);

  const [name, setName] = useState(displayName);
  const [avatar, setAvatar] = useState(photoURL);
  const [progress, setProgress] = useState();
  const [rename, setRename] = useState();

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
            setProgress(progress);
            if (progress === 100) {
              setProgress();
            }
          },
          (err) => {
            console.log(err);
          },
          () => {
            getDownloadURL(upLoadTask.snapshot.ref).then(async (url) => {
              let downloadURL = url;
              if (downloadURL) {
                try {
                  const res = await axios.put(`http://localhost:8800/user/${uid}`, {
                    username: name,
                    photoURL: downloadURL,
                  });

                  updateAuthFirestore(uid, {photoURL: downloadURL});
                  console.log(res);
                  setAvatar(downloadURL);
                  // TODO update SQL
                } catch (err) {
                  console.log(err);
                }
              }
            });
          },
        );
      }
    }
    return;
  };

  const renameHandler = async (e) => {
    e.preventDefault();
    if (name) {
      try {
        const res = await axios.put(`http://localhost:8800/user/${uid}`, {
          username: name,
          photoURL: avatar,
        });
        updateAuthFirestore(uid, {displayName: name});
        console.log(res);
        // TODO update SQL
      } catch (err) {
        console.log(err);
      }
      setRename(false);
    }
  };

  return (
    <div style={{marginLeft: '-15vw'}}>
      <Typography variant="h5" sx={{color: color.green03, fontWeight: 700}}>
        Account Settings
      </Typography>
      <Suspense fallback={<CircularProgress />}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            // src={photoURL}
            src={avatar}
            sx={{
              width: '15vw',
              height: '15vw',
              backgroundColor: '#8993A4',
              fontSize: 120,
            }}
            alt={displayName}
          ></Avatar>
          <Button
            variant="contained"
            component="label"
            sx={{my: 1, ...colorHover.greenGradBtn}}
          >
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
              defaultValue={displayName}
              value={name}
              size="small"
              sx={{width: '100%', backgroundColor: '#ECECEC'}}
              onChange={(e) => {
                setRename(true);
                setName(e.target.value);
              }}
              onKeyUp={(event) =>
                event.key === 'Enter' ? renameHandler(event) : null
              }
            ></TextField>
          </Grid>
          <Grid item xs={2}>
            {rename && (
              <Button
                variant="contained"
                sx={{ml: 1, ...colorHover.greenGradBtn}}
                onClick={renameHandler}
              >
                Rename
              </Button>
            )}
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
          <Grid item xs={2}></Grid>
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
              // startIcon={
              //   <LockOutlinedIcon
              //     sx={{marginRight: 1, width: 24, height: 24}}
              //   />
              // }
              sx={{
                color: color.green03,
                textTransform: 'none',
                fontSize: 16,
                fontWeight: 700,
                paddingX: 2,
                marginTop: 1,
              }}
              // onClick={handleClick}
            >
              Change password
            </Button>
          </Grid>
          <Grid item xs={2.75}></Grid>
        </Grid> */}

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
