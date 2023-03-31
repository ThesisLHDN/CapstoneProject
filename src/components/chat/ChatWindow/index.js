import React, {useContext, useMemo, useState} from 'react';
import {styled} from '@mui/material/styles';
import {color} from 'src/style';
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
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import CircularProgress from '@mui/material/CircularProgress';

import Message from './Message';
import TypingArea from './TypingArea';
import {ChatContext} from 'src/Context/ChatProvider';
import {useFirestore} from 'src/hooks/useFirestore';

// const IOSSwitch = styled((props) => (
//   <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
// ))(({theme}) => ({
//   width: 40,
//   height: 22,
//   padding: 0,
//   '& .MuiSwitch-switchBase': {
//     padding: 0,
//     margin: 2,
//     transitionDuration: '300ms',
//     '&.Mui-checked': {
//       transform: 'translateX(18px)',
//       color: '#fff',
//       '& + .MuiSwitch-track': {
//         backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
//         opacity: 1,
//         border: 0,
//       },
//       '&.Mui-disabled + .MuiSwitch-track': {
//         opacity: 0.5,
//       },
//     },
//     '&.Mui-focusVisible .MuiSwitch-thumb': {
//       color: '#33cf4d',
//       border: '6px solid #fff',
//     },
//     '&.Mui-disabled .MuiSwitch-thumb': {
//       color:
//         theme.palette.mode === 'light'
//           ? theme.palette.grey[100]
//           : theme.palette.grey[600],
//     },
//     '&.Mui-disabled + .MuiSwitch-track': {
//       opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
//     },
//   },
//   '& .MuiSwitch-thumb': {
//     boxSizing: 'border-box',
//     width: 18,
//     height: 18,
//   },
//   '& .MuiSwitch-track': {
//     borderRadius: 24 / 2,
//     backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
//     opacity: 1,
//     transition: theme.transitions.create(['background-color'], {
//       duration: 500,
//     }),
//   },
// }));

const StyledDiv = styled(`div`)({
  padding: '8px',
  borderRadius: '4px',
  '&:hover': {backgroundColor: '#00000010', cursor: 'pointer'},
});

function ChatWindow({currentUser}) {
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

  const handleClose = () => {
    setOpen(false);
  };

  const [settingModal, setSettingModal] = useState(false);

  return (
    <Box container sx={{p: 2, height: '100%'}}>
      {selectedRoom ? (
        <>
          {' '}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 2,
              height: '50px',
            }}
          >
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
            <Box sx={{display: 'flex', gap: 1}}>
              <Box sx={{position: 'relative'}}>
                <IconButton
                  sx={{color: color.green03}}
                  onClick={() => setSettingModal(true)}
                >
                  <MoreVertIcon />
                </IconButton>
                {settingModal && (
                  <Box>
                    <Box
                      sx={{
                        width: '100vw',
                        height: '100vh',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        backgroundColor: '#00000020',
                      }}
                      onClick={() => setSettingModal(false)}
                    ></Box>{' '}
                    <Paper
                      elevation={3}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        p: 1,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{textAlign: 'center', color: color.green03}}
                      >
                        Setting
                      </Typography>
                      <Divider sx={{my: 1}}></Divider>
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
                      <StyledDiv
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
                      </StyledDiv>
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
                    </Paper>
                  </Box>
                )}
                <Modal open={open} onClose={handleClose}>
                  <Paper
                    elevation={3}
                    sx={{position: 'absolute', right: 0, top: 0}}
                  >
                    <Button variant="text">Rename</Button>
                    <Button
                      variant="contained"
                      startIcon={<PersonAddAltRoundedIcon />}
                    >
                      Add Member
                    </Button>
                  </Paper>
                </Modal>
              </Box>
            </Box>
          </Box>
          <Divider
            variant="middle"
            sx={{borderBottom: 2, color: '#666'}}
          ></Divider>
          <Box
            sx={{
              py: 2,
              height: 'calc(100% - 126px)',
              overflowY: 'scroll',
              scrollSnapType: 'y proximity',
            }}
          >
            {newMess
              .reverse()
              .map(({author, authorId, body, type, createdAt}) => (
                <Message mine={authorId === currentUser.uid}>
                  {{author, authorId, body, type, createdAt}}
                </Message>
              ))}
          </Box>
          <TypingArea currentUser={currentUser} roomId={selectedRoom.id} />
        </>
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
    </Box>
  );
}

export default ChatWindow;
