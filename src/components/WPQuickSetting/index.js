import React, {useState} from 'react';
import {color} from 'src/style';
import {
  Box,
  Grid,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Button,
  Typography,
  ClickAwayListener,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import {styled} from '@mui/system';
import {NavLink, Link} from 'react-router-dom';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {colorHover} from 'src/style';
const StyledMenuItem = styled(MenuItem)({
  '&:hover': {color: color.green03},
});

function WPQuickSetting() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;
  return (
    <div className="w-full absolute bottom-20">
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Paper
            sx={{width: 440, height: '40vh', borderRadius: 3, overflow: 'hidden', marginBottom: 2, marginLeft: 3}}
            elevation={3}
          >
            <Grid container sx={{width: '100%'}}>
              <Grid item xs={6}>
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <MenuList sx={{px: 0, width: '100%'}}>
                    <StyledMenuItem sx={{ py: 1 }}>
                      <Link to="/workspace-setting" className='text-base'>Dang's Workspace</Link>
                    </StyledMenuItem>
                    <StyledMenuItem sx={{ py: 1 }}>
                      <Link to="/workspace-setting" className='text-base'>Lam's Workspace</Link>
                    </StyledMenuItem>
                  </MenuList>
                  <div className="absolute bottom-8">
                    <Button
                      sx={{...colorHover.greenGradBtn, fontSize: 16}}
                      endIcon={<AddIcon />}
                    >
                      Create Workspace
                    </Button>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{fontWeight: 700, textAlign: 'center', mt: 2, mb: 0.5}}>
                  {' '}
                  Workspace Setting
                </Typography>
                <MenuList>
                  <MenuItem sx={{ py: 1 }}>Rename</MenuItem>
                  <MenuItem sx={{ py: 1 }}>Dashboard</MenuItem>
                </MenuList>
              </Grid>
            </Grid>
          </Paper>
        </ClickAwayListener>
      </Popper>
      <p className="mx-6 h-px border-0 bg-gray-400 font-extrabold shadow-2xl"></p>
      <div className="hover:text-green-tx cursor-pointer" onClick={handleClick}>
        <div className="mt-5 ml-6 mr-14">
          <p className="text-sm overflow-hidden truncate font-bold">
            Dang Nguyen's Workspace
          </p>
        </div>
        <div className="absolute right-6 bottom-0">
          <SettingsOutlinedIcon
            style={{fontSize: '24px', color: '#008000', paddingTop: '3px'}}
          />
        </div>
      </div>
    </div>
  );
}

export default WPQuickSetting;
