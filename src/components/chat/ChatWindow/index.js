import React, {useState} from 'react';
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

import Message from './Message';
import TypingArea from './TypingArea';

// const dummyMessage = {
//   name: 'Kenh chat 1',
//   id: 1,
//   members: [],
//   messages: [
//     {
//       senderId: 1911044,
//       senderName: 'Dang Nguyen',
//       message: 'How are you today?',
//       time: new Date(2022, 11, 1),
//     },
//     {
//       senderId: 1910298,
//       senderName: 'Lam Nguyen',
//       message: "I'm good",
//       time: new Date(2022, 11, 2),
//     },
//     {
//       senderId: 1910298,
//       senderName: 'Lam Nguyen',
//       message:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//       time: new Date(2022, 11, 3),
//     },
//     {
//       senderId: 1911044,
//       senderName: 'Dang Nguyen',
//       message: 'Not good',
//       time: new Date(),
//     },
//     {
//       senderId: 1910298,
//       senderName: 'Lam Nguyen',
//       message:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//       time: new Date(2022, 11, 3),
//     },
//     {
//       senderId: 1911044,
//       senderName: 'Dang Nguyen',
//       message: 'Not good',
//       time: new Date(),
//     },
//     {
//       senderId: 1910298,
//       senderName: 'Lam Nguyen',
//       message:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//       time: new Date(2022, 11, 3),
//     },
//     {
//       senderId: 1911044,
//       senderName: 'Dang Nguyen',
//       message: 'Not good',
//       time: new Date(),
//     },
//   ],
// };

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({theme}) => ({
  width: 40,
  height: 22,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(18px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 18,
    height: 18,
  },
  '& .MuiSwitch-track': {
    borderRadius: 24 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

function ChatWindow({messages}) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [settingModal, setSettingModal] = useState(false);

  return (
    <Box container sx={{p: 2, height: '100%'}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
        <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
          <Avatar src={messages.picture} alt={messages.name}></Avatar>
          <Typography variant="h5">{messages.name}</Typography>
        </Box>
        <Box sx={{display: 'flex', gap: 1}}>
          {/* <Button variant="contained" startIcon={<PersonAddAltRoundedIcon />}>
            Add Member
          </Button> */}
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
                    p: 2,
                  }}
                >
                  <Typography variant="h6" sx={{color: color.green03}}>
                    Setting
                  </Typography>
                  <Divider sx={{my: 1}}></Divider>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      height: 40,
                    }}
                  >
                    <Typography>Rename</Typography>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      height: 40,
                      gap: 2,
                    }}
                  >
                    <Typography>Notifications</Typography>
                    <IOSSwitch defaultChecked />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      height: 40,
                      gap: 2,
                    }}
                  >
                    <Typography>Public</Typography>
                    <IOSSwitch defaultChecked />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      height: 40,
                    }}
                  >
                    <Typography>Members</Typography>
                  </div>
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
      <Divider variant="middle" sx={{borderBottom: 2, color: '#666'}}></Divider>
      <Box sx={{py: 2, height: 'calc(100% - 116px)', overflowY: 'scroll'}}>
        {messages.messages.reverse().map(({senderName, senderId, message, time}) => (
          <Message mine={senderId === 1911044}>
            {{senderName, senderId, message, time}}
          </Message>
        ))}
      </Box>
      <TypingArea />
    </Box>
  );
}

export default ChatWindow;
