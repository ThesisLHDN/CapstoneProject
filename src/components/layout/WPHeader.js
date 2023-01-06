import React from 'react';
import logo from 'src/assets/images/logo.png';
import {
  Box,
  Tabs,
  Tab,
  Button,
  IconButton,
  Paper,
  Modal,
  Popper,
} from '@mui/material';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import AddIcon from '@mui/icons-material/Add';

import Avatar from '@mui/material/Avatar';

import SearchBar from 'src/components/search';
import {Link} from 'react-router-dom';
import {getAuth, signOut} from 'firebase/auth';
import {color, colorHover} from 'src/style';

// function LinkTab(props) {
//   return (
//     <Tab
//       component="a"
//       onClick={(event) => {
//         event.preventDefault();
//       }}
//       {...props}
//     />
//   );
// }

export default function Header() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100vw',
        height: 48,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 20px',
        borderRadius: 0,
        position: 'fixed',
        top: 0,
        zIndex: 5,
      }}
    >
      <Link to="/">
        <img src={logo} width="150" alt="Logo" />
      </Link>

      <SearchBar value={value}></SearchBar>
      <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
        <Button
          variant="contained"
          sx={{
            height: 36,
            ...colorHover.greenGradBtn,
          }}
          startIcon={<AddIcon />}
        >
          Create workspace
        </Button>
        <IconButton
          color="primary"
          aria-label="no notification"
          sx={{color: color.green03}}
        >
          <NotificationsNoneIcon />
        </IconButton>
        <div style={{position: 'relative'}}>
          <IconButton onClick={handleClick}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{height: 32, width: 32}}
            />
          </IconButton>

          <Popper id={id} open={open} anchorEl={anchorEl}>
            <Box
              sx={{
                backgroundColor: 'white',
                borderRadius: '10px',
                p: 2,
                right: 0,
                top: 0,
                boxShadow: '2px 2px 5px #00000020',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                position: 'absolute',
              }}
            >
              <Button
                variant="contained"
                sx={{...colorHover.greenBtn}}
                href="/profile"
              >
                Profile
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleLogout}
                href="/login"
              >
                Logout
              </Button>
            </Box>
          </Popper>
        </div>
      </Box>
    </Paper>
  );
}
