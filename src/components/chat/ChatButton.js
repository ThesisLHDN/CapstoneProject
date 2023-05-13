import {useContext, useState} from 'react';
import {color} from 'src/style';
import {Badge, IconButton, Dialog} from '@mui/material';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import ChatProvider from 'src/Context/ChatProvider';
import ChatRoom from './index';

function ChatButton({currentUser, projectId}) {
  const [openChat, setOpenChat] = useState(false);
  return (
    <ChatProvider>
      <Badge
        badgeContent={4}
        color="primary"
        overlap="circular"
        variant="dot"
        sx={{
          position: 'fixed',
          bottom: 40,
          right: 40,
          '& .MuiBadge-badge': {
            fontSize: 10,
            backgroundColor: 'coral',
            padding: '0 4px',
          },
        }}
      >
        <IconButton aria-label="chat-button" onClick={() => setOpenChat(true)}>
          <ChatRoundedIcon sx={{width: 40, height: 40, color: color.green03}} />
        </IconButton>
        <ChatRoom
          openChat={openChat}
          onCloseChat={() => {
            setOpenChat(false);
          }}
          currentUser={currentUser}
          projectId={projectId}
        />
      </Badge>
    </ChatProvider>
  );
}

export default ChatButton;
