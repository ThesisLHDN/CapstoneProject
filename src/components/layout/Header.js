import {useContext, useState} from 'react';
import logo from "src/assets/logo/official/full_color.svg";
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
  MenuItem,
} from '@mui/material';

import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

import Avatar from '@mui/material/Avatar';

import {Link, useNavigate} from 'react-router-dom';
import {signOut} from 'firebase/auth';
import {auth} from 'src/firebase/config';
import {color, colorHover} from 'src/style';
import Notification from '../notification/Notification';
import AddMember from 'src/components/popup/AddMember';
import {AuthContext} from 'src/Context/AuthProvider';
import {AppContext} from 'src/Context/AppProvider';
import axios from 'src/hooks/axios';

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
  const [openAddMembers, setOpenAddMembers] = useState(false);
  const {
    user: {displayName, photoURL, uid},
  } = useContext(AuthContext);
  const {project} = useContext(AppContext);
  const navigate = useNavigate();

  const getLastestWorkspace = async () => {
    try {
      const res = await axios.get(`/lastworkspace/${uid}`);
      navigate(`/workspace-setting/${res.data.id}?user=${uid}`);
    } catch (err) {
      console.log(err);
    }
  };

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

  // const [anchorElAdd, setAnchorElAdd] = useState(null);

  // const handleClickAdd = (event) => {
  //   setAnchorElAdd(anchorElAdd ? null : event.currentTarget);
  // };

  const open = Boolean(anchorEl);
  // const openAdd = Boolean(anchorElAdd);
  const id = open ? 'simple-popper' : undefined;

  // function handleClose(value) {
  //   // TODO get value
  //   setOpenAddMembers(false);
  // }

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
      <Box sx={{display: 'flex'}}>
        <Link to="/" style={{display: 'flex', alignItems: 'center'}}>
          <img src={logo} width="120" height="40" alt="Logo" />
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
              display: 'none',
              // backgroundColor: color.green03,
              // height: '3px',
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
            // to={`/workspace-setting/${lastWorkspace}?user=${uid}`}
            // component={Link}
            onClick={getLastestWorkspace}
          />
          {/* <Tab
          sx={{textTransform: 'none'}}
          label="Projects"
          to="/project-setting"
          component={Link}
        /> */}
        </Tabs>
      </Box>

      {/* <SearchBar value={value}></SearchBar> */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {uid === project.adminId && (
          <Button
            variant="contained"
            sx={{
              height: 36,
              ...colorHover.greenGradBtn,
            }}
            startIcon={<PersonAddOutlinedIcon />}
            // onClick={handleClickAdd}
            onClick={() => setOpenAddMembers(true)}
          >
            Add member
          </Button>
        )}
        {/* <Popper id={id} open={openAdd} anchorEl={anchorElAdd} sx={{zIndex: 5}}>
          <ClickAwayListener onClickAway={handleClickAdd}>
            <div style={{position: 'absolute'}}>
              <AddMember
                confirmContent="Add"
                title={
                  <p>
                    Add Member to <i>First Scrum Project</i>
                  </p>
                }
                sx={{position: 'absolute', right: -100}}
                placeholder="eg. dangnguyen@gmail.com"
                fieldLabel="Enter emails"
              />
            </div>
          </ClickAwayListener>
        </Popper> */}

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
        <AddMember
          open={openAddMembers}
          // onClose={(value) => handleClose(value)}
          onClose={() => setOpenAddMembers(false)}
        ></AddMember>
      </Box>
    </Paper>
  );
}
