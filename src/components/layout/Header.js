import React from 'react';
import logo from 'src/assets/images/logo.png';
import {Box, Tabs, Tab, Button, IconButton, Paper, Modal} from '@mui/material';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

import Avatar from '@mui/material/Avatar';

import SearchBar from 'src/components/search';
import {Link} from 'react-router-dom';
import {getAuth, signOut} from 'firebase/auth';

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        // boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
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
          '& .MuiTab-root.Mui-selected': {color: 'green', fontWeight: 'bold'},
          '& .MuiTabs-indicator': {
            backgroundColor: 'green',
            height: '3px',
          },
        }}
      >
        {/* <Tab label="Home" to="/" component={Link} /> */}
        <Tab label="Roadmap" to="/roadmap" component={Link} />
        {/* <Tab label="Dashboard" to="/dashboard" component={Link} /> */}
        <Tab label="Board" to="/board" component={Link} />
        <Tab
          label="Workspace Setting"
          to="/workspace-setting"
          component={Link}
        />
      </Tabs>

      <SearchBar value={value}></SearchBar>
      <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
        <Button
          variant="contained"
          sx={{
            height: 36,
            backgroundImage:
              'radial-gradient(farthest-corner at -100% 200%, #ffff00, #008000)',
            transition: 'background 2s',
            '&:hover': {
              backgroundImage:
                'radial-gradient(farthest-corner at -100% 200%, #ffff22, #228822)',
            },
          }}
          startIcon={<PersonAddOutlinedIcon />}
        >
          Add member
        </Button>
        <IconButton
          color="primary"
          aria-label="no notification"
          sx={{color: 'green'}}
        >
          <NotificationsNoneIcon />
        </IconButton>
        <div style={{position: 'relative'}}>
          <IconButton onClick={handleOpen}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{height: 32, width: 32}}
            />
          </IconButton>

          {/* <AvatarPopup sx={{position: 'absolute'}} /> */}
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                backgroundColor: 'white',
                borderRadius: '10px',
                p: 2,
                right: '20px',
                top: '20px',
                boxShadow: '2px 2px 5px #00000020',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                position: 'absolute',
              }}
            >
              <Button variant="contained">Profile</Button>
              <Button variant="outlined" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Modal>
        </div>
      </Box>

      {/* <img
        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png"
        width="20px"
        alt="avatar"
      >
        {" "}
      </img> */}
    </Paper>
  );
}

// return (
//   <Box
//     sx={{
//       backgroundColor: "white",
//       height: 60,
//       display: "flex",
//       alignItems: "center",
//       boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
//       padding: "10px",
//     }}
//   >
//     <img src={logo} width="150" alt="Logo" />
//     {/* <Box sx={{ width: 500 }}>
//       <BottomNavigation
//         showLabels
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//       >
//         <BottomNavigationAction label="Your works" />
//         <BottomNavigationAction label="Projects" />
//       </BottomNavigation>
//     </Box>
//     <nav>
//       <Link to="/">Home Page</Link>
//       <Link to="/project-setting">Project setting Page</Link>
//       <Link to="/dashboard">Dashboard</Link>
//     </nav> */}
//   </Box>
// );
// }

// export default Header;
