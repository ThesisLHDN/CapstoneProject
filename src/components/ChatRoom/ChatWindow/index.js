import React, {useState} from 'react';
import {
  Box,
  Modal,
  Paper,
  IconButton,
  Button,
  Divider,
  Typography,
  Avatar,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';

import Message from './Message';
import TypingArea from './TypingArea';

const dummyMessage = {
  name: 'Kenh chat 1',
  id: 1,
  members: [],
  messages: [
    {
      senderId: 1911044,
      senderName: 'Dang Nguyen',
      message: 'How are you today?',
      time: new Date(2022, 11, 1),
    },
    {
      senderId: 1910298,
      senderName: 'Lam Nguyen',
      message: "I'm good",
      time: new Date(2022, 11, 2),
    },
    {
      senderId: 1910298,
      senderName: 'Lam Nguyen',
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      time: new Date(2022, 11, 3),
    },
    {
      senderId: 1911044,
      senderName: 'Dang Nguyen',
      message: 'Not good',
      time: new Date(),
    },
    {
      senderId: 1910298,
      senderName: 'Lam Nguyen',
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      time: new Date(2022, 11, 3),
    },
    {
      senderId: 1911044,
      senderName: 'Dang Nguyen',
      message: 'Not good',
      time: new Date(),
    },
    {
      senderId: 1910298,
      senderName: 'Lam Nguyen',
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      time: new Date(2022, 11, 3),
    },
    {
      senderId: 1911044,
      senderName: 'Dang Nguyen',
      message: 'Not good',
      time: new Date(),
    },
  ],
};

function ChatWindow() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box container sx={{p: 2, height: '100%'}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
        <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
          <Avatar src="#" alt="Kênh chat 1"></Avatar>
          <Typography variant="h5">Kênh chat 1</Typography>
        </Box>
        <Box sx={{display: 'flex', gap: 1}}>
          <Button variant="contained" startIcon={<PersonAddAltRoundedIcon />}>
            Add Member
          </Button>
          <Box sx={{position: 'relative'}}>
            <IconButton sx={{color: 'green'}} onClick={handleOpen}>
              <MoreVertIcon />
            </IconButton>
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
      <Box sx={{height: 'calc(100% - 116px)', overflowY: 'scroll'}}>
        {dummyMessage.messages.map(({senderName, senderId, message, time}) => (
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
