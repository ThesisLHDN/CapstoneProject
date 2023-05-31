import {useMemo, useState} from 'react';
import {color, colorHover} from 'src/style';
import {IconButton} from '@mui/material';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import ChatProvider from 'src/Context/ChatProvider';
import ChatRoom from './index';

function ChatButton({currentUser, projectId}) {
  const [openChat, setOpenChat] = useState(false);
  const Chat = useMemo(
    () => (
      <ChatRoom
        openChat={openChat}
        onCloseChat={() => {
          setOpenChat(false);
        }}
        currentUser={currentUser}
        projectId={projectId}
      />
    ),
    [openChat],
  );
  return (
    <ChatProvider>
      {/* <Badge
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
      > */}
      <IconButton
        aria-label="chat-button"
        onClick={() => setOpenChat(true)}
        sx={{
          position: 'fixed',
          bottom: 40,
          right: 40,
          ...colorHover.greenGradBtn,
        }}
      >
        <ChatRoundedIcon sx={{width: 40, height: 40}} />
      </IconButton>
      {Chat}
      {/* </Badge> */}
    </ChatProvider>
  );
}

export default ChatButton;
