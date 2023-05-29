import React, { useState, useEffect, useRef } from 'react'
import { Avatar, IconButton, Popper, ClickAwayListener, Grow, Button, Typography, MenuList, MenuItem, Box, FormControl } from '@mui/material';
import { Link } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {color} from 'src/style';

function FilterRow() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <FormControl sx={{width: 80}} margin="none">
        <select
          displayEmpty
          inputProps={{'aria-label': 'Without label'}}
          size="small"
          defaultValue={''}
          style={{
            border: 'none',
            outline: "none",
            width: '100%',
            height: 28,
            cursor: 'pointer',
            backgroundColor: '#F5F5F5'
          }}
        >
          <option value="All" style={{ color: 'white', backgroundColor: '#515669'}}>
            <em>All</em>
          </option>
          <option value="Unread" style={{ color: 'white', backgroundColor: '#515669'}}>
            <em>Unread</em>
          </option>
        </select>
      </FormControl>
    </Box>
  );
}

function Notification() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);


  return (
    <>
      <IconButton
        color="primary"
        aria-label="no notification"
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        sx={{color: color.green03, textTransform: 'none' }}
      >
        <NotificationsNoneIcon />
      </IconButton>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{zIndex: 5}}
      >
        {({TransitionProps, placement}) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'right bottom' : 'right top',
              }}
            >
              <div>
              <Box
                elevation={2}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#F5F5F5',
                  boxShadow: '0 0 20px #00000020',
                  width: 400,
                  height: 500,
                  pt: 1,
                }}
              >
                <div className='border-b' style={{ marginBottom: -8}}>
                  <div className='flex justify-between ml-2'>
                    <div className='flex'>
                      <Typography sx={{fontWeight: 600, fontSize: 14, ml: 1, mt: 0.5}}>Notification</Typography>
                      <MenuList autoFocusItem={open} sx={{px: 2, py: 0}}><FilterRow /></MenuList>
                    </div>
                    <div className=''>
                      <Button 
                        endIcon={<CheckCircleOutlineIcon />}
                        sx={{ textTransform: 'none', color: 'black', mt: -0.4, mr: 1 }}
                      >
                        Mark all as read
                      </Button>
                    </div>
                  </div>
                </div>
                <div className='flex justify-between'>
                  <MenuList>
                    {/* <MenuItem sx={{ pt: 1.5, pb: 1.5, fontSize: 14, borderBottom: '1px #E5E7EB solid', whiteSpace: 'normal' }}>
                      <Link to="/issue" onClick={handleToggle} sx={{ textOverflow: 'ellipsis'}} >
                        <div className='flex'>
                          <Avatar
                            src="X"
                            sx={{ width: 24, height: 24, mt: 0.5, backgroundColor: "#8993A4" }}
                            alt="Lam Nguyen"
                          />
                          <div className='ml-3'>
                            <div className='flex'>
                              <span className='font-bold'>Lam Nguyen&nbsp;</span>
                              <span>updated&nbsp;</span>
                              <span className='font-bold text-done-tx'>DWP-11&nbsp;</span>
                              <p className='bg-done-bg px-2 rounded-sm text-done-tx'>Done</p>
                            </div>
                            <div className='mt-1 text-justify'>
                              <p>A description has been added to the issue with content <i>Hello, how are you?</i>.</p>
                            </div>
                            <div className='text-gray-500 mt-3'>Today at 9:42 AM</div>
                          </div>
                        </div>
                      </Link>
                    </MenuItem> */}
                  </MenuList>
                </div>
              </Box>
              </div>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  )
}

export default Notification