import {useContext} from 'react';

import ChatSideBar from './ChatSideBar';
import ChatWindow from './ChatWindow';

import {ChatContext} from 'src/Context/ChatProvider';

import {Grid, Paper} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {useFirestore} from 'src/hooks/useFirestore';

function ChatRoom({currentUser}) {
  const {rooms, selectedRoom} = useContext(ChatContext);

  return (
    <Paper
      elevation={3}
      sx={{
        width: '80vw',
        height: '80vh',
        borderRadius: '30px',
        overflow: 'hidden',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      {rooms ? (
        <Grid
          container
          sx={{
            overflow: 'hidden',
            height: 600,
          }}
        >
          <Grid item xs={4} sx={{height: '100%'}}>
            {/* <ChatSideBar
            data={channels}
            onSelect={(e) => selectChannelHandler(e)}
          /> */}
            <ChatSideBar
              data={rooms}
              currentUser={currentUser}
              // onSelect={(e) => selectChannelHandler(e)}
            />
          </Grid>
          <Grid item xs={8} sx={{height: '100%'}}>
            {' '}
            <Paper elevation={3} sx={{height: '100%', borderRadius: 0}}>
              <ChatWindow
                currentUser={currentUser}
                // messages={messages}
              />
            </Paper>
          </Grid>
        </Grid>
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
    </Paper>
  );
}

export default ChatRoom;
