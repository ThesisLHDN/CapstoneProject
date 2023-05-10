import {useContext, useState} from 'react';
import logo from 'src/assets/images/logo.png';
import {
  Box,
  // Tabs,
  // Modal,
  // Tab,
  Button,
  IconButton,
  Paper,
  Popper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from '@mui/material';

// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import AddIcon from '@mui/icons-material/Add';

import Avatar from '@mui/material/Avatar';

import SearchBar from 'src/components/search';
import {Link} from 'react-router-dom';
import {signOut} from 'firebase/auth';
import {colorHover} from 'src/style';
import Notification from '../notification/Notification';
import CreateWorkspace from 'src/components/popup/CreateWorkspace';
import {auth} from 'src/firebase/config';
import {AuthContext} from 'src/Context/AuthProvider';

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
  const [value, setValue] = useState(0);
  const {
    user: {displayName, photoURL},
  } = useContext(AuthContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleLogout = () => {
    // const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const [anchorEl, setAnchorEl] = useState(null);

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
        <img src={logo} width="150" height="45" alt="Logo" />
      </Link>

      {/* <SearchBar value={value}></SearchBar> */}
      <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
        <Button
          variant="contained"
          sx={{
            height: 36,
            ...colorHover.greenGradBtn,
          }}
          startIcon={<AddIcon />}
        >
          <Link to="/create-workspace">Create workspace</Link>
        </Button>
        {/* <CreateWorkspace /> */}
        <Notification />
        <div style={{position: 'relative'}}>
          <IconButton onClick={handleClick}>
            <Avatar
              alt={displayName ? displayName : ''}
              src={photoURL}
              sx={{height: 32, width: 32}}
            />
          </IconButton>

          <Popper id={id} open={open} anchorEl={anchorEl}>
            <ClickAwayListener onClickAway={handleClick}>
              <Box
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  right: -15,
                  top: 0,
                  border: 'solid 1px #ECEDF0',
                  boxShadow: '2px 2px 5px #00000020',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  position: 'absolute',
                  width: 100,
                }}
              >
                <MenuList sx={{px: 0, width: '100%'}}>
                  <MenuItem
                    sx={{
                      py: 1,
                      fontSize: 12,
                      borderBottom: 'solid 1px #ECEDF0',
                    }}
                  >
                    <Link
                      to="/profile"
                      onClick={handleClick}
                      className="text-base"
                    >
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem
                    sx={{py: 1, fontSize: 12, borderTop: 'solid 1px #ECEDF0'}}
                  >
                    <Link
                      to="/login"
                      onClick={handleLogout}
                      className="text-base"
                    >
                      Log out
                    </Link>
                  </MenuItem>
                </MenuList>
                {/* <Button
                  variant="contained"
                  sx={{...colorHover.greenGradBtn, textTransform: 'none'}}
                  href="/profile"
                >
                  Profile
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleLogout}
                  href="/login"
                  sx={{textTransform: 'none'}}
                >
                  Log out
                </Button> */}
              </Box>
            </ClickAwayListener>
          </Popper>
        </div>
      </Box>
    </Paper>
  );
}
