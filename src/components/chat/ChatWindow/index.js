import React, {useContext, useMemo, useState} from 'react';
import {styled} from '@mui/material/styles';
import {color, colorHover} from 'src/style';
import {
  Box,
  Modal,
  Paper,
  IconButton,
  Button,
  Divider,
  Typography,
  Avatar,
  Switch,
  Drawer,
} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import CircularProgress from '@mui/material/CircularProgress';
import CreationPopup from 'src/components/popup/Create';

import Message from './Message';
import TypingArea from './TypingArea';
import {ChatContext} from 'src/Context/ChatProvider';
import {useFirestore} from 'src/hooks/useFirestore';
import {
  getDocumentWithCondition,
  updateDocument,
} from 'src/firebase/firestoreServices';

const StyledDiv = styled(`div`)({
  padding: '12px',
  '&:hover': {backgroundColor: '#00000010', cursor: 'pointer'},
});
const drawerWidth = 200;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
  ({theme, open}) => ({
    height: 'calc(100% - 70px)',
    flexGrow: 1,
    // width: '100%',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 0,
    ...(open && {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
  backgroundColor: 'white',
  color: '#181818',
  shadow: 'none',
  left: 0,
  position: 'absolute',
  width: '100%',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

function ChatWindow({currentUser}) {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const [open, setOpen] = useState(false);
  const {selectedRoom, roomMembers} = useContext(ChatContext);

  const messagesCondition = useMemo(
    () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom ? selectedRoom.id : '',
      sort: 'desc',
    }),
    [selectedRoom],
  );

  const messages = useFirestore('messages', messagesCondition);

  const addMemberHandler = async (email) => {
    console.log(email);
    // todo validate
    const newMemberList = await getDocumentWithCondition('users', {
      fieldName: 'email',
      operator: '==',
      compareValue: email,
    });

    console.log(newMemberList);
    const member = newMemberList.docs.map((member) => ({
      id: member.id,
      ...member.data(),
    }))[0];
    console.log(member);
    if (member) {
      if (!(member.id in roomMembers)) {
        selectedRoom.members.push(member.id);
        console.log('start update', member);
        console.log('rooms', selectedRoom.id, selectedRoom.members);
        updateDocument('rooms', selectedRoom.id, {
          members: selectedRoom.members,
        });
      }
    }

    setOpen(false);
  };

  // const path = useMemo(() => `rooms/${selectedRoom.id}/messages`, []);
  // const messages = useFirestore(path);
  if (messages && roomMembers) {
    var newMess = messages.map((message) => {
      return {
        author: roomMembers.find((member) => member.uid === message.authorId),
        ...message,
      };
    });
  }

  // const [settingModal, setSettingModal] = useState(false);

  return (
    <Box container sx={{height: '100%', position: 'relative'}}>
      {selectedRoom ? (
        <Box sx={{backgroundColor: '#efefef', height: '100%'}}>
          <AppBar open={openDrawer}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                <Avatar
                  src={selectedRoom.coverPicture}
                  alt={selectedRoom.name}
                ></Avatar>

                <Box>
                  {' '}
                  <Typography variant="h6">{selectedRoom.name}</Typography>
                  <Typography variant="subtitle2">
                    {selectedRoom.description}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  sx={{...colorHover.greenBtn}}
                  startIcon={<PersonAddAltRoundedIcon />}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Add Member
                </Button>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerOpen}
                  sx={{...(openDrawer && {display: 'none'})}}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          <Main open={openDrawer}>
            <DrawerHeader sx={{width: '100%'}} />{' '}
            {/* Tạm thôi{' '}
            {roomMembers.map((mem) => (
              <Typography>
                {mem.id} {mem.displayName}
              </Typography>
            ))}
            <Divider
              variant="middle"
              sx={{borderBottom: 2, color: '#666'}}
            ></Divider> */}
            <Box
              sx={{
                height: 'calc(100% - 64px)',
                overflowY: 'scroll',
                // scrollSnapType: 'y proximity',
              }}
            >
              {newMess
                .reverse()
                .map(({author, authorId, body, type, createdAt}) => (
                  <Message mine={authorId === currentUser.uid}>
                    {{author, authorId, body, type, createdAt}}
                  </Message>
                ))}{' '}
            </Box>
            {/* <DrawerFooter sx={{backgroundColor: 'green', width: '100%'}} />{' '} */}
          </Main>{' '}
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
              },
            }}
            variant="persistent"
            anchor="right"
            open={openDrawer}
          >
            <DrawerHeader>
              <Button onClick={handleDrawerClose} sx={{textTransform: 'none'}}>
                {theme.direction === 'rtl' ? (
                  <ChevronLeftIcon />
                ) : (
                  <>
                    {' '}
                    <ChevronRightIcon />
                    <Typography
                      variant="h6"
                      sx={{textAlign: 'center', color: color.green03}}
                    >
                      Setting
                    </Typography>
                  </>
                )}
              </Button>
            </DrawerHeader>
            <Divider />
            <StyledDiv
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 40,
              }}
            >
              <Typography>Rename</Typography>
            </StyledDiv>
            {/* <StyledDiv
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 40,
                gap: 2,
              }}
            >
              <Typography>Notifications</Typography>
              <Switch defaultChecked />
            </StyledDiv>
            <StyledDiv
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 40,
                gap: 2,
              }}
            >
              <Typography>Public</Typography>
              <Switch defaultChecked />
            </StyledDiv> */}
            <StyledDiv
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 40,
              }}
            >
              <Typography>Members</Typography>
            </StyledDiv>
          </Drawer>
          <TypingArea currentUser={currentUser} roomId={selectedRoom.id} />
        </Box>
      ) : (
        <CircularProgress
          sx={{
            position: 'absolute',
            top: '50%',
            right: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        />
      )}
      <CreationPopup
        title="Add member"
        fieldLabel={'Please enter an email'}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={addMemberHandler}
        confirmContent={'Add'}
      ></CreationPopup>
    </Box>
  );
}

export default ChatWindow;
