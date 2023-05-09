import { useState } from 'react';
import {
  Avatar,
  Button,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Paper,
  Alert,
  Snackbar,
} from '@mui/material';
import { colorHover } from 'src/style';
import PhotoRoundedIcon from '@mui/icons-material/PhotoRounded';
import SmartDisplayRoundedIcon from '@mui/icons-material/SmartDisplayRounded';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';
import { storage } from 'src/firebase/config';

const CommentForm = ({
  currentUser,
  isAvatar = true,
  initialText = '',
  handleSubmit,
  handleCancel,
}) => {
  const [text, setText] = useState(initialText);
  const [reparedFile, setReparedFile] = useState();
  const [displayBtns, setDisplayBtns] = useState(true);
  const isTextareaDisabled = text.length === 0 && !reparedFile;
  const [snackbarContent, setSnackbarContent] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    if (reparedFile) {
      const path = `comments/${new Date().getTime() + reparedFile.name}`;
      const fileRef = ref(storage, path);
      const upLoadTask = uploadBytesResumable(fileRef, reparedFile);

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
              handleSubmit({
                body: text,
                file: {
                  name: reparedFile.name,
                  type: reparedFile.type,
                  downloadURL: downloadURL,
                  storagePath: path,
                },
              });
              return;
            }
            console.log(downloadURL);
          });
        },
      );
    }
    else handleSubmit({body: text});
    setText('');
    setReparedFile();
  };

  const onCancel = (event) => {
    setText('');
    setReparedFile();
    setDisplayBtns(false);
    handleCancel();
  };

  const uploadHandler = (file) => {
    setReparedFile(file);
    setDisplayBtns(true);
  };

  return (
    <form>
      <div className="flex">
        {isAvatar ? (
          <Avatar
            src={currentUser.photoURL}
            sx={{width: 40, height: 40, backgroundColor: '#8993A4'}}
            alt={currentUser.displayName}
          />
        ) : (
          <></>
        )}
        <TextField
          sx={{ml: 1, width: '100%'}}
          multiline
          maxRows={5}
          // className={`w-full h-10 p-2 border-solid border-1 border-color text-sm ${
          //   isAvatar ? 'ml-2' : 'mt-2'
          // }`}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setDisplayBtns(true);
          }}
          placeholder="Add a comment..."
          InputProps={{
            startAdornment: (
              <>
                {reparedFile && (
                  <Paper
                    sx={{
                      width: 120,
                      height: 120,
                      backgroundColor: '#efefef',
                      position: 'relative',
                      mr: 2,
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
                            // onClick={() => {
                            //   setOpenDeletePopup(true);
                            //   setSelectedFile({id: file.id, name: file.name});
                            // }}
                          >
                            <DeleteOutlineRoundedIcon
                              sx={{color: '#181818'}}
                              onClick={() => {
                                setReparedFile();
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
                        {reparedFile.name}
                      </p>
                    </Box>
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
                      accept="image/*"
                      type="file"
                      onChange={(event) => {
                        uploadHandler(event.target.files[0]);
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
                      // multiple
                      type="file"
                      onChange={(event) => {
                        uploadHandler(event.target.files[0]);
                      }}
                      onClick={(e) => (e.target.value = null)}
                    />
                    <SmartDisplayRoundedIcon />
                  </IconButton>
                </InputAdornment>
              </>
            ),
          }}
        />
      </div>

      {displayBtns && (
        <div className={`${isAvatar ? 'ml-12' : ''} mt-2`}>
          <Button
            variant="contained"
            onClick={isTextareaDisabled ? null : onSubmit}
            sx={{
              textTransform: 'none',
              height: 36,
              fontWeight: 700,
              backgroundColor: 'green',
              '&:hover': {backgroundColor: '#42A100'},
            }}
          >
            Save
          </Button>

          <Button
            variant="text"
            onClick={onCancel}
            sx={{
              textTransform: 'none',
              marginLeft: 1,
              height: 36,
              fontWeight: 700,
              color: '#42526E',
              padding: '8px 16px',
            }}
          >
            Cancel
          </Button>
        </div>
      )}
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
    </form>
  );
};

export default CommentForm;
