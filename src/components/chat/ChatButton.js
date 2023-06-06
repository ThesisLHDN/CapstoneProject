import {useMemo, useState, useContext} from 'react';
import {color, colorHover} from 'src/style';
import {IconButton, Badge} from '@mui/material';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import ChatProvider, {ChatContext} from 'src/Context/ChatProvider';
import ChatRoom from './index';

function ChatButton({currentUser, projectId}) {
  const [openChat, setOpenChat] = useState(false);
  const {notiDot, selectedRoom, viewMessage} = useContext(ChatContext);
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
    <>
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
        onClick={() => {
          setOpenChat(true);
          viewMessage(selectedRoom);
        }}
        sx={{
          position: 'fixed',
          bottom: 40,
          right: 40,
          color: color.green03,
        }}
      >
        {notiDot ? (
          <Badge color="warning" variant="dot">
            <ChatRoundedIcon sx={{width: 40, height: 40}} />
          </Badge>
        ) : (
          <ChatRoundedIcon sx={{width: 40, height: 40}} />
        )}
      </IconButton>
      {Chat}
      {/* </Badge> */}
    </>
  );
}

export default ChatButton;
