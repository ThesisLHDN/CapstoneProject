import {useState} from 'react';

import {
  InputAdornment,
  IconButton,
  TextField,
  Button,
  Paper,
  Box,
  Grid,
  Divider,
} from '@mui/material';
import PhotoRoundedIcon from '@mui/icons-material/PhotoRounded';
import SmartDisplayRoundedIcon from '@mui/icons-material/SmartDisplayRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
// import SendRoundedIcon from '@mui/icons-material/Send';

import {colorHover} from 'src/style';
import {addDocument, updateDocument} from 'src/firebase/firestoreServices';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {storage} from 'src/firebase/config';

function TypingArea({currentUser, roomId}) {
  // console.log(currentUser)

  const [open, setOpen] = useState(false);
  function handleClose() {
    setOpen(false);
  }

  const [openSnackbar, setOpenSnackbar] = useState('');
  const [snackbarContent, setSnackbarContent] = useState('');
  const [selectedFile, setSelectedFile] = useState();

  const upLoadHandler = async (files) => {
    if (files) {
      let file = files[0];
      console.log('Updating');
      if (file) {
        console.log(file);
        const path = `documents/${new Date().getTime() + file.name}`;
        const fileRef = ref(storage, path);
        const upLoadTask = uploadBytesResumable(fileRef, file);
        upLoadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            );
            setSnackbarContent('Upload is ' + progress + '% done');
          },
          (err) => {
            console.log(err);
          },
          () => {
            getDownloadURL(upLoadTask.snapshot.ref).then(async (url) => {
              let downloadURL = url;
              if (downloadURL) {
                // const newDocData = {
                //   authorId: uid,
                //   name: file.name,
                //   parentId: parentId,
                //   type: file.type,
                //   downloadURL: downloadURL,
                //   storagePath: path,
                // };
                setMessage({
                  body: downloadURL,
                  type: file.type,
                  name: file.name,
                });
                // console.log('new doc added', newDocData);
                // addDocument(`projects/${projectId}/documents`, newDocData);
              }

              console.log(downloadURL);
            });
          },
        );
      }
    }
    return;
  };

  const [message, setMessage] = useState({body: '', type: 'text'});

  const handleChange = (e) => {
    setMessage({type: 'text', body: e.target.value});
  };

  const handleKeyPress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === 'Enter') {
      handleOnSubmit(message);
    }
  };

  const handleOnSubmit = (message = message) => {
    if (roomId) {
      if (message.body.length) {
        const messageData = {
          authorId: currentUser.uid,
          body: message.body,
          type: message.type,
          roomId: roomId,
        };
        console.log('new message', messageData);
        addDocument('messages', messageData);
        updateDocument('rooms', roomId, {lastMessage: messageData});
        setMessage({body: '', type: 'text'});
      }
    }
  };
  return (
    <Grid
      container
      spacing={2}
      sx={{
        backgroundColor: 'white',
        position: 'absolute',
        bottom: '0px',
        width: '100%',
        m: 0,
        pb: 2,
        pr: 2,
      }}
    >
      <Grid item xs={10}>
        <TextField
          value={message.type === 'text' ? message.body : ''}
          onChange={handleChange}
          size="small"
          placeholder="Aa"
          sx={{width: '100%'}}
          onKeyPress={handleKeyPress}
          InputProps={{
            startAdornment: (
              <>
                {message.type !== 'text' && (
                  <Paper sx={{width: 120, height: 120, wordBreak: 'break-all'}}>
                    {message.name}
                  </Paper>
                )}
              </>
            ),
            endAdornment: (
              <>
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    edge="end"
                    sx={{...colorHover.greenIconBtn}}
                    component="label"
                  >
                    <input
                      hidden
                      accept="*"
                      multiple
                      type="file"
                      onChange={(event) => {
                        upLoadHandler(event.target.files);
                      }}
                      onClick={(e) => (e.target.value = null)}
                    />
                    <InsertDriveFileRoundedIcon />
                  </IconButton>
                </InputAdornment>
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    edge="end"
                    sx={{...colorHover.greenIconBtn}}
                    component="label"
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(event) => {
                        upLoadHandler(event.target.files);
                      }}
                      onClick={(e) => (e.target.value = null)}
                    />
                    <PhotoRoundedIcon />
                  </IconButton>
                </InputAdornment>
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    edge="end"
                    sx={{...colorHover.greenIconBtn}}
                    component="label"
                  >
                    <input
                      hidden
                      accept="video/*"
                      multiple
                      type="file"
                      onChange={(event) => {
                        upLoadHandler(event.target.files);
                      }}
                      onClick={(e) => (e.target.value = null)}
                    />
                    <SmartDisplayRoundedIcon />
                  </IconButton>
                </InputAdornment>
              </>
            ),
          }}
        ></TextField>
      </Grid>{' '}
      <Grid item xs={2}>
        <Button
          variant="contained"
          sx={{width: '100%', height: '100%', ...colorHover.greenBtn}}
          onClick={() => handleOnSubmit(message)}
          // endIcon={<SendRoundedIcon />}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  );
}

export default TypingArea;
