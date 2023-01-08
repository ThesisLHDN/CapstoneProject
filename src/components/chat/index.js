import {useState} from 'react';

import {Grid, Paper} from '@mui/material';

import ChatSideBar from './ChatSideBar';
import ChatWindow from './ChatWindow';

const channels = [
  {
    name: 'Channel 1',
    id: 1,
    members: [],
    picture:
      'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
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
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras est purus, placerat vitae ante ac, volutpat fringilla purus. Proin hendrerit nibh eros, in tempor enim tempor quis. Etiam tempor vestibulum libero id hendrerit. Cras egestas.',
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
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu felis at orci consectetur aliquam et eu tellus. Nunc dignissim risus erat, ac eleifend sapien viverra non. Aenean pellentesque ex sed metus accumsan porttitor. Phasellus vel tempor tortor. Nulla in.',
        time: new Date(2022, 11, 2),
      },
    ],
  },
  {
    name: 'Channel 2',
    id: 2,
    members: [],
    picture:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    messages: [
      {
        senderId: 1910298,
        senderName: 'Lam Nguyen',
        message:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
        time: new Date(),
      },
      {
        senderId: 1911044,
        senderName: 'Dang Nguyen',
        message:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        time: new Date(2022, 11, 2),
      },
    ],
  },
  {
    name: 'Channel 3',
    id: 3,
    members: [],
    picture:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    messages: [
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
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras est purus, placerat vitae ante ac, volutpat fringilla purus. Proin hendrerit nibh eros, in tempor enim tempor quis. Etiam tempor vestibulum libero id hendrerit. Cras egestas.',
        time: new Date(),
      },
      {
        senderId: 1910298,
        senderName: 'Lam Nguyen',
        message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        time: new Date(2022, 11, 3),
      },
    ],
  },
];

// const dummyMessage =
function ChatRoom() {
  const [messages, setMessages] = useState(channels[0]);

  const selectChannelHandler = (channelId) => {
    // console.log(channelId);
    for (let channel of channels) {
      if (channel.id === channelId) {
        setMessages(channel);
      }
    }
    // console.log(messages);
  };

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
          overflow: 'hidden',
          height: 600,
        }}
      >
        <Grid item xs={4} sx={{height: '100%'}}>
          <ChatSideBar
            data={channels}
            onSelect={(e) => selectChannelHandler(e)}
          />
        </Grid>
        <Grid item xs={8} sx={{height: '100%'}}>
          {' '}
          <Paper elevation={3} sx={{height: '100%', borderRadius: 0}}>
            <ChatWindow messages={messages} />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ChatRoom;
