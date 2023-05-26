import {useContext, lazy, Suspense, useMemo} from 'react';

import ChatSideBar from './ChatSideBar';
import ChatWindow from './ChatWindow';

import {ChatContext} from 'src/Context/ChatProvider';

import {Grid, Paper, Dialog} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {useFirestore} from 'src/hooks/useFirestore';

// const ChatWindow = lazy(() => import('./ChatWindow'));

function ChatRoom({projectId, openChat, onCloseChat}) {
  const {rooms, selectedRoom, roomMembers, currentRoomMembers, uid} =
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

  const messages = useFirestore('messages', messagesCondition);
  if (messages && roomMembers) {
    var newMess = messages.map((message) => {
      return {
        author: roomMembers.find((member) => member.uid === message.authorId),
        ...message,
      };
    });
  }

  const ChatSidebar = useMemo(
    () => <ChatSideBar data={rooms} projectId={projectId}></ChatSideBar>,
    [rooms],
  );

  const ChatContent = useMemo(
    () => (
      <ChatWindow
        selectedRoom={selectedRoom}
        newMess={newMess}
        roomMembers={roomMembers}
        currentRoomMembers={currentRoomMembers}
        uid={uid}
      />
    ),
    [newMess],
  );

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
              {/* <ChatSideBar
                // data={rooms}
                // currentUser={currentUser}
                projectId={projectId}
              /> */}
              {ChatSidebar}
            </Grid>
            <Grid item xs={8} sx={{height: '100%'}}>
              <Paper elevation={3} sx={{height: '100%', borderRadius: 0}}>
                {ChatContent}
              </Paper>
            </Grid>
          </Grid>
        </Suspense>
      </Paper>
    </Dialog>
  );
}

export default ChatRoom;
