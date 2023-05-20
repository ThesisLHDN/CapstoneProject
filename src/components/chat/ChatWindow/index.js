import React, {useContext, useMemo, useState} from 'react';
import {styled} from '@mui/material/styles';
import {color, colorHover} from 'src/style';
import {
  Box,
  IconButton,
  Button,
  Divider,
  Typography,
  Avatar,
  Drawer,
} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import PersonRemoveAlt1RoundedIcon from '@mui/icons-material/PersonRemoveAlt1Rounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import CreationPopup from 'src/components/popup/Create';

import Message from './Message';
import TypingArea from './TypingArea';
import {ChatContext} from 'src/Context/ChatProvider';
import {useFirestore} from 'src/hooks/useFirestore';
import {
  getDocumentWithCondition,
  updateDocument,
  deleteDocument,
} from 'src/firebase/firestoreServices';
import WarningPopup from 'src/components/popup/Warning';

const StyledDiv = styled(`div`)({
  padding: '12px',
  '&:hover': {backgroundColor: '#00000010', cursor: 'pointer'},
});
const drawerWidth = 260;

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
  // const messagesEndRef = useRef(
  //   document.getElementById('chat-window-messages'),
  // );

  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);

  const [open, setOpen] = useState(false);
  const [openRename, setOpenRename] = useState(false);
  const {selectedRoom, roomMembers, currentRoomMembers, uid} =
    useContext(ChatContext);

  const messagesCondition = useMemo(
    () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom ? selectedRoom.id : '',
      sort: 'desc',
    }),
    [selectedRoom],
  );

  const messagesRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesRef.current.scrollIntoView({
      // behavior: 'smooth',
    });
  };

  const messages = useFirestore('messages', messagesCondition);
  if (messages && roomMembers) {
    var newMess = messages.map((message) => {
      return {
        author: roomMembers.find((member) => member.uid === message.authorId),
        ...message,
      };
    });
  }

  React.useEffect(() => {
    if (messagesRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  const addMemberHandler = async (email) => {
    console.log(email);
    // TODO validate
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
      if (!(member.id in currentRoomMembers)) {
        selectedRoom.members.push(member.id);
        console.log('start update', member);
        updateDocument('rooms', selectedRoom.id, {
          members: selectedRoom.members,
          allmembers: selectedRoom.members,
        });
      }
    }

    setOpen(false);
  };

  const renameHandler = (name) => {
    if (name) {
      console.log('rename', name);
      setOpenRename(false);
      updateDocument('rooms', selectedRoom.id, {
        name: name,
      });
    } else {
      console.log('Cancel rename');
    }
  };

  // const path = useMemo(() => `rooms/${selectedRoom.id}/messages`, []);
  // const messages = useFirestore(path);

  const [openDeleteRoom, setOpenDeleteRoom] = useState(false);
  const [openRemoveMem, setOpenRemoveMem] = useState(false);
  const [mem, setMem] = useState(false);
  const deleteRoomHandler = () => {
    console.log('deleteRoomHandler');
    deleteDocument('rooms', selectedRoom.id);
    // Todo delete all messages
    setOpenDeleteRoom(false);
  };
  const removeMemHandler = () => {
    console.log('removeMemHandler', mem);

    const newCurrentList = currentRoomMembers
      .filter((member) => member.uid !== mem.uid)
      .map((member) => member.uid);
    console.log('delete', mem.uid, 'from', currentRoomMembers, newCurrentList);

    updateDocument('rooms', selectedRoom.id, {members: newCurrentList});

    // Todo pop member id out of members array and update doc
    // cần quan tâm nếu members đã bị xóa thì không có data
    setOpenRemoveMem(false);
    setMem(false);
  };

  const adminRight = selectedRoom ? uid === selectedRoom.adminId : false;

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
                  {/* <Typography variant="subtitle2">
                    {selectedRoom.description}
                  </Typography> */}
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
                  onClick={() => setOpenDrawer(true)}
                  sx={{...(openDrawer && {display: 'none'})}}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          <Main open={openDrawer}>
            <DrawerHeader sx={{width: '100%'}} />{' '}
            <Box
              sx={{
                pl: 1,
                height: 'calc(100% - 64px)',
                overflowY: 'scroll',
                // scrollSnapType: 'y proximity',
              }}
            >
              {newMess
                .reverse()
                .map(({author, authorId, body, type, createdAt, file}) => (
                  <Message mine={authorId === uid}>
                    {{author, authorId, body, type, createdAt, file}}
                  </Message>
                ))}{' '}
              <div ref={messagesRef} />
            </Box>
            {/* <DrawerFooter sx={{backgroundColor: 'green', width: '100%'}} />{' '} */}
          </Main>{' '}
          <Drawer
            sx={{
              width: drawerWidth,
              columnGap: 2,
              gap: 2,
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
              <Button
                onClick={() => setOpenDrawer(false)}
                sx={{textTransform: 'none'}}
              >
                {theme.direction === 'rtl' ? (
                  <ChevronLeftIcon />
                ) : (
                  <>
                    {' '}
                    <ChevronRightIcon sx={{color: '#181818'}} />
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
              onClick={() => {
                setOpenRename(true);
              }}
            >
              <Typography>Rename</Typography>
            </StyledDiv>
            <StyledDiv
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography>Members</Typography>
            </StyledDiv>{' '}
            <Box sx={{pl: 1}}>
              {currentRoomMembers.map((member) => (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    {' '}
                    <Avatar src={member.photoURL} alt={member.name}></Avatar>
                    <Typography>{member.displayName}</Typography>
                  </Box>

                  {adminRight && member.id !== uid ? (
                    <IconButton
                      onClick={() => {
                        setMem(member);
                        setOpenRemoveMem(true);
                      }}
                    >
                      <PersonRemoveAlt1RoundedIcon />
                    </IconButton>
                  ) : (
                    <IconButton disabled>
                      <KeyRoundedIcon sx={{color: '#f4c430'}} />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Box>
            <StyledDiv
              style={{
                display: selectedRoom.adminId === uid ? 'flex' : 'none',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 40,
              }}
              onClick={() => setOpenDeleteRoom(true)}
            >
              <Typography sx={{color: 'red'}}>Delete room</Typography>
            </StyledDiv>
          </Drawer>
          <TypingArea uid={uid} roomId={selectedRoom ? selectedRoom.id : ''} />
        </Box>
      ) : (
        <Box sx={{position: 'relative', m: 0, height: '100%'}}>
          <Typography
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '80%',
              transform: 'translate(-50%,-50%)',
            }}
          >
            You are not in any chat room. Create or be invited to one.
          </Typography>
        </Box>
      )}
      <CreationPopup
        title="Add member"
        fieldLabel={'Please enter an email'}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={addMemberHandler}
        confirmContent={'Add'}
      ></CreationPopup>

      <WarningPopup
        title={'Delete room'}
        open={openDeleteRoom}
        onClose={() => setOpenDeleteRoom(false)}
        handleSubmit={deleteRoomHandler}
        content={
          'Do you really want to delete this room? This cannot be undone'
        }
      ></WarningPopup>

      <WarningPopup
        title={'Remove member'}
        open={openRemoveMem}
        onClose={() => setOpenRemoveMem(false)}
        delContent={'Remove'}
        handleSubmit={removeMemHandler}
        content={
          <Typography sx={{fontSize: 14}}>
            Do you really want to remove <b>{mem.displayName}</b> (
            <i>{mem.email}</i>)? This cannot be undone.
          </Typography>
        }
      ></WarningPopup>

      <CreationPopup
        title="Rename room"
        fieldLabel={'Please enter new name'}
        open={openRename}
        onClose={() => setOpenRename(false)}
        onSubmit={renameHandler}
        confirmContent={'Rename'}
      ></CreationPopup>
    </Box>
  );
}

export default ChatWindow;
