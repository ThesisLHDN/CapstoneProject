import {useState} from 'react';

import {
  InputAdornment,
  IconButton,
  TextField,
  Button,
  Alert,
  Snackbar,
  Paper,
  Box,
  Grid,
} from '@mui/material';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CloseIcon from '@mui/icons-material/Close';

import {colorHover} from 'src/style';
import {addDocument, updateDocument} from 'src/firebase/firestoreServices';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {storage} from 'src/firebase/config';

function TypingArea({uid, roomId}) {
  const [reparedFiles, setReparedFiles] = useState([]);
  // console.log(currentUser)

  // const [open, setOpen] = useState(false);
  // function handleClose() {
  //   setOpen(false);
  // }

  // const [openSnackbar, setOpenSnackbar] = useState('');
  const [snackbarContent, setSnackbarContent] = useState('');
  // const [selectedFile, setSelectedFile] = useState();

  const uploadHandler = async (file) => {
    // event.preventDefault();

    // todo upload
    if (file) {
      const path = `comments/${new Date().getTime() + file.name}`;
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
              const messageData = {
                authorId: uid,
                body: 'File: ' + file.name,
                file: {
                  name: file.name,
                  type: file.type,
                  downloadURL: downloadURL,
                  storagePath: path,
                },
                roomId: roomId,
              };
              console.log('new message', messageData);
              addDocument('messages', messageData);
              updateDocument('rooms', roomId, {lastMessage: messageData});
            }
            console.log(downloadURL);
          });
        },
      );
    }
    return;
  };

  const [message, setMessage] = useState({body: '', type: 'text'});

  const handleChange = (e) => {
    setMessage({body: e.target.value});
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleOnSubmit(message);
    }
  };

  const handleSelectFile = (event) => {
    setReparedFiles([...event.target.files]);
    setMessage({body: ''});
  };

  const handleOnSubmit = (varmessage = message) => {
    if (roomId) {
      if (varmessage.body.length) {
        const messageData = {
          authorId: uid,
          body: varmessage.body,
          roomId: roomId,
        };
        console.log('new message', messageData);
        addDocument('messages', messageData);
        updateDocument('rooms', roomId, {lastMessage: messageData});
        setMessage({body: ''});
      }
      if (reparedFiles.length) {
        reparedFiles.forEach((file) => {
          uploadHandler(file);
        });
      }
      setReparedFiles([]);
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
          value={message.body}
          onChange={handleChange}
          size="small"
          placeholder="Aa"
          sx={{width: '100%'}}
          onKeyPress={handleKeyPress}
          disabled={!!reparedFiles.length}
          InputProps={{
            startAdornment: (
              <>
                {reparedFiles.map((file) => (
                  <Paper
                    sx={{
                      width: 120,
                      height: 120,
                      backgroundColor: '#efefef',
                      position: 'relative',
                      mr: 2,
                      my: 2,
                    }}
                  >
                    <Box
                      sx={{
                        height: 80,
                        position: 'relative',
                        '&:hover': {
                          backgroundColor: '#adadad',
                          '& .buttons': {display: 'block'},
                        },
                        '&:hover .buttons': {
                          display: 'block',
                        },
                      }}
                    >
                      <DescriptionOutlinedIcon
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%,-50%)',
                        }}
                      ></DescriptionOutlinedIcon>{' '}
                      <Box className={'buttons'} sx={{display: 'none'}}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            gap: 1,
                          }}
                        >
                          <IconButton
                            sx={{
                              width: 28,
                              height: 28,
                              borderRadius: '4px',
                              backgroundColor: '#efefef',
                            }}
                          >
                            <DeleteOutlineRoundedIcon
                              sx={{color: '#181818'}}
                              onClick={() => {
                                setReparedFiles([]);
                              }}
                            />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        p: 1,
                        backgroundColor: 'white',
                        width: '100%',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <p
                        style={{
                          overflow: 'hidden',
                          width: '100%',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {' '}
                        {file.name}
                      </p>
                    </Box>
                  </Paper>
                ))}
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
                      onChange={handleSelectFile}
                      onClick={(e) => (e.target.value = null)}
                    />
                    <InsertDriveFileRoundedIcon />
                  </IconButton>
                </InputAdornment>
                {/* <InputAdornment position="end">
                  <IconButton
                    size="small"
                    edge="end"
                    sx={{...colorHover.greenIconBtn}}
                    component="label"
                  >
                    <input
                      multiple
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(event) => {
                        setReparedFiles(event.target.files);
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
                        setReparedFiles(event.target.files);
                      }}
                      onClick={(e) => (e.target.value = null)}
                    />
                    <SmartDisplayRoundedIcon />
                  </IconButton>
                </InputAdornment> */}
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
        >
          Send
        </Button>
      </Grid>
      <Snackbar
        open={snackbarContent}
        autoHideDuration={3000}
        onClose={() => {
          setSnackbarContent(false);
        }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setSnackbarContent()}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert
          onClose={() => setSnackbarContent(false)}
          severity="success"
          sx={{width: '100%'}}
        >
          {snackbarContent}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default TypingArea;
