import React from 'react';

import Grid from '@mui/material/Grid';

import ChatSideBar from './ChatSideBar';
import ChatWindow from './ChatWindow';
import Paper from '@mui/material/Paper';

function ChatRoom() {
  return (
    <Paper elevation={3} sx={{borderRadius: '30px', overflow: 'hidden'}}>
      <Grid
        container
        sx={{
          // borderRadius: '30px',
          overflow: 'hidden',
          // boxShadow: '0px 2px 8px #00000030',
          height: 600,
        }}
      >
        <Grid item xs={5} sx={{height:'100%'}}>
          <ChatSideBar />
        </Grid>
        <Grid
          item
          xs={7}
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
