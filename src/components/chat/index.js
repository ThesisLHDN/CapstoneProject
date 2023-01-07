import React from 'react';

import {Grid, Paper} from '@mui/material';

import ChatSideBar from './ChatSideBar';
import ChatWindow from './ChatWindow';

const channels = [
  {
    name: 'Channel 1',
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
  },
  {
    name: 'Channel 2',
    id: 2,
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
  },
  {
    name: 'Channel 3',
    id: 3,
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
  },
];

// const dummyMessage =
function ChatRoom() {
  return (
    <Paper
      elevation={3}
      sx={{
        width: '80vw',
        borderRadius: '30px',
        overflow: 'hidden',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Grid
        container
        sx={{
          // borderRadius: '30px',
          overflow: 'hidden',
          // boxShadow: '0px 2px 8px #00000030',
          height: 600,
        }}
      >
        <Grid item xs={4} sx={{height: '100%'}}>
          <ChatSideBar />
        </Grid>
        <Grid
          item
          xs={8}
          // sx={{backgroundColor: 'blue'}}
          sx={{height: '100%'}}
        >
          {' '}
          <Paper elevation={3} sx={{height: '100%', borderRadius: 0}}>
            <ChatWindow />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ChatRoom;
