import { useContext } from 'react';
import {
  Box,
  Button,
  IconButton,
  Paper,
  MenuList,
  MenuItem,
  ClickAwayListener,
  Snackbar,
  Alert,
} from '@mui/material';

import CreatePopup from 'src/components/popup/Create';
import AddIcon from '@mui/icons-material/Add';
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { storage } from 'src/firebase/config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDocument } from 'src/firebase/firestoreServices';
import { AuthContext } from 'src/Context/AuthProvider';

function AddItem({parentId, projectId, onClose}) {
  const {
    user: {uid},
  } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  function handleClose() {
    setOpen(false);
  }

  const [openSnackbar, setOpenSnackbar] = useState('');
  const [snackbarContent, setSnackbarContent] = useState('');
  const [selectedFile, setSelectedFile] = useState();

  const uploadHandler = async (files) => {
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
                const newDocData = {
                  authorId: uid,
                  name: file.name,
                  parentId: parentId,
                  type: file.type,
                  downloadURL: downloadURL,
                  storagePath: path,
                };
                console.log('new doc added', newDocData);
                addDocument(`projects/${projectId}/documents`, newDocData);
              }

              console.log(downloadURL);
            });
          },
        );
      }
    }
    return;
  };

  const createFolderHandler = (folderName) => {
    if (folderName && typeof folderName === 'string') {
      const newFolderData = {
        authorId: uid,
        name: folderName,
        parentId: parentId,
        type: 'folder',
      };
      console.log('new doc added', newFolderData);
      addDocument(`projects/${projectId}/documents`, newFolderData);
    }

    setOpen(false);
  };

  const [openMenu, setOpenMenu] = useState(false);

  const handleClick = () => {
    setOpenMenu((prev) => !prev);
  };

  // const action = (
  //   <React.Fragment>
  //     <Button
  //       color="secondary"
  //       size="small"
  //       onClick={() => {
  //         setSnackbarContent(false);
  //       }}
  //     >
  //       UNDO
  //     </Button>
  //     <IconButton
  //       size="small"
  //       aria-label="close"
  //       color="inherit"
  //       onClick={handleClose}
  //     >
  //       <CloseIcon fontSize="small" />
  //     </IconButton>
  //   </React.Fragment>
  // );

  return (
    <>
      <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
        <Box sx={{position: 'relative', zIndex: 5, width: 'fit-content'}}>
          {' '}
          <Button
            variant="text"
            startIcon={<AddIcon />}
            sx={{
              color: 'black',
              fontSize: '14px',
              textTransform: 'none',
            }}
            onClick={handleClick}
          >
            Add new item
          </Button>
          {openMenu && (
            <Paper sx={{width: 'fit-content', position: 'absolute'}}>
              <MenuList
                sx={{
                  width: 'fit-content',
                  '& *': {fontSize: '14px !important'},
                  '& li': {display: 'flex', gap: 1},
                  '& svg': {width: 24, height: 24},
                }}
              >
                <MenuItem
                  onClick={() => {
                    setOpen(true);
                    setOpenMenu(false);
                  }}
                >
                  <CreateNewFolderRoundedIcon />
                  Create folder
                </MenuItem>
                <MenuItem sx={{fontSize: 14}}>
                  <NoteAddRoundedIcon />
                  <input
                    type="file"
                    id="upload"
                    hidden
                    onChange={(event) => {
                      uploadHandler(event.target.files);
                    }}
                    onClick={(e) => (e.target.value = null)}
                  />
                  <label for="upload">Upload file</label>
                </MenuItem>
                <MenuItem sx={{fontSize: 14}} onClick={() => onClose(true)}>
                  <EditNoteRoundedIcon />
                  <label onClick={() => onClose(true)}>Create new file</label>
                </MenuItem>
              </MenuList>
            </Paper>
          )}
        </Box>
      </ClickAwayListener>
      <CreatePopup
        title={'Create folder'}
        fieldLabel={"Enter folder's name"}
        placeholder={'Folder name'}
        confirmContent={'Create'}
        onSubmit={createFolderHandler}
        onClose={() => setOpen(false)}
        open={open}
      />
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
    </>
  );
}

export default AddItem;
