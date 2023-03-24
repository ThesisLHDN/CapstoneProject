import React from 'react';
import {
  Typography,
  Box,
  Button,
  Grid,
  Breadcrumbs,
  Link,
  IconButton,
  Paper,
  MenuList,
  MenuItem,
  Popper,
  ClickAwayListener,
  Snackbar,
  Alert,
} from '@mui/material';
import Sort from 'src/components/Sort';
import SearchBar from 'src/components/search';
import CreatePopup from 'src/components/popup/Create';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import SortRoundedIcon from "@mui/icons-material/SortRounded"
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import CloseIcon from '@mui/icons-material/Close';
import {useState} from 'react';
import {storage} from 'src/firebase/config';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';

function AddItem() {
  const [open, setOpen] = useState(false);
  function handleClose() {
    setOpen(false);
  }

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const upLoadHandler = async (files) => {
    if (files) {
      var file = files[0];
    }
    console.log('Updating');
    if (file) {
      console.log(file);
      const fileRef = ref(storage, `documents/${file.name}`);
      const upLoadTask = uploadBytesResumable(fileRef, file);
      upLoadTask.on(
        'state_changed',
        (snapshot) => {},
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(upLoadTask.snapshot.ref).then(async (url) => {
            let downloadURL = url;
            if (downloadURL) {
              setOpenSnackbar(true);
            }
            console.log(downloadURL);
            // }
          });
        },
      );
    }
    return;
  };

  // function handleClickAway() {
  //   setOpenMenu(false);
  // }

  const [openMenu, setOpenMenu] = useState(false);

  const handleClick = () => {
    setOpenMenu((prev) => !prev);
  };

  const action = (
    <React.Fragment>
      <Button
        color="secondary"
        size="small"
        onClick={() => {
          setOpenSnackbar(false);
        }}
      >
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
        <Box sx={{position: 'relative'}}>
          {' '}
          <Button
            variant="text"
            startIcon={<AddIcon />}
            sx={{
              color: 'black',
              fontSize: '14px',
              textTransform: 'none',
              mt: 2,
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
                      upLoadHandler(event.target.files);
                    }}
                  />
                  <label for="upload">Upload file</label>
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
        onClose={handleClose}
        open={open}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => {
          setOpenSnackbar(false);
        }}
        action={action}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{width: '100%'}}
        >
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddItem;
