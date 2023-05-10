import {useContext, lazy, Suspense} from 'react';

import ChatSideBar from './ChatSideBar';
// import ChatWindow from './ChatWindow';

import {ChatContext} from 'src/Context/ChatProvider';

import {Grid, Paper, Dialog} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const ChatWindow = lazy(() => import('./ChatWindow'));

function ChatRoom({currentUser, projectId, openChat, onCloseChat}) {
  const {rooms} = useContext(ChatContext);

  return (
    <Dialog open={openChat} onClose={onCloseChat}>
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
        <Suspense
          fallback={
            <CircularProgress
              sx={{
                position: 'absolute',
                top: '50%',
                right: '50%',
                transform: 'translate(-50%,-50%)',
              }}
            />
          }
        >
          <Grid
            container
            sx={{
              overflow: 'hidden',
              height: '100%',
            }}
          >
            <Grid item xs={4} sx={{height: '100%'}}>
              <ChatSideBar
                data={rooms}
                currentUser={currentUser}
                projectId={projectId}
              />
            </Grid>
            <Grid item xs={8} sx={{height: '100%'}}>
              <Paper elevation={3} sx={{height: '100%', borderRadius: 0}}>
                <ChatWindow currentUser={currentUser} />
              </Paper>
            </Grid>
          </Grid>
        </Suspense>
      </Paper>
    </Dialog>
  );
}

export default ChatRoom;
