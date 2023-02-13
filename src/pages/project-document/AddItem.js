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
} from '@mui/material';
import SearchBar from 'src/components/search';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import SortRoundedIcon from "@mui/icons-material/SortRounded"
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Sort from 'src/components/Sort';
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import CreatePopup from 'src/components/popup/Create';
import {useState} from 'react';

function AddItem() {
  const [open, setOpen] = useState(false);
  function handleClose() {
    setOpen(false);
  }

  function handleClickAway() {
    setOpenMenu(false);
  }

  const [openMenu, setOpenMenu] = useState(false);

  const handleClick = () => {
    setOpenMenu((prev) => !prev);
  };

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
                  <input type="file" id="upload" hidden />
                  <label for="upload">Upload file</label>
                </MenuItem>
              </MenuList>
            </Paper>
          )}
        </Box>
      </ClickAwayListener>
      {/* <Dialog open={open} onClose={handleClose}> */}
      <CreatePopup
        title={'Create folder'}
        fieldLabel={"Enter folder's name"}
        placeholder={'Folder name'}
        confirmContent={'Create'}
        onClose={handleClose}
        open={open}
      />
      {/* </Dialog> */}
    </>
  );
}

export default AddItem;
