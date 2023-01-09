import {useState} from 'react';
import logo from 'src/assets/images/logo.png';
import {
  Box,
  Tabs,
  Tab,
  Button,
  IconButton,
  Paper,
  Popper,
  ClickAwayListener,
  MenuList,
  MenuItem
} from '@mui/material';

import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

import Avatar from '@mui/material/Avatar';

import SearchBar from 'src/components/search';
import {Link} from 'react-router-dom';
import {getAuth, signOut} from 'firebase/auth';
import {color, colorHover} from 'src/style';
import Notification from '../notification/Notification';

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
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const [value, setValue] = useState(0);

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
        <img src={logo} width="150" alt="Logo" />
      </Link>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        sx={{
          mx: 2,
          height: '100%',
          '& .MuiTab-root.Mui-selected': {
            color: color.green03,
            fontWeight: 'bold',
          },
          '& .MuiTabs-indicator': {
            backgroundColor: color.green03,
            height: '3px',
          },
        }}
      >
        {/* <Tab label="Home" to="/" component={Link} /> */}
        {/* <Tab label="Roadmap" to="/roadmap" component={Link} /> */}
        {/* <Tab label="Dashboard" to="/dashboard" component={Link} /> */}
        {/* <Tab label="Board" to="/board" component={Link} /> */}
        <Tab
          sx={{textTransform: 'none'}}
          label="Workspace Settings"
          to="/workspace-setting"
          component={Link}
        />
        {/* <Tab
          sx={{textTransform: 'none'}}
          label="Projects"
          to="/project-setting"
          component={Link}
        /> */}
      </Tabs>

      <SearchBar value={value}></SearchBar>
      <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
        <Button
          variant="contained"
          sx={{
            height: 36,
            ...colorHover.greenGradBtn,
          }}
          startIcon={<PersonAddOutlinedIcon />}
        >
          Add member
        </Button>
        <Notification />
        <div style={{position: 'relative'}}>
          <IconButton onClick={handleClick}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
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
                  <MenuItem sx={{ py: 1, fontSize: 12, borderBottom: 'solid 1px #ECEDF0' }}>
                    <Link to="/profile" onClick={handleClick} className='text-base'>Profile</Link>
                  </MenuItem>
                  <MenuItem sx={{ py: 1, fontSize: 12, borderTop: 'solid 1px #ECEDF0' }}>
                    <Link to="/login" onClick={handleLogout} className='text-base'>Log out</Link>
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
