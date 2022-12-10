import {useState} from 'react';
import {Badge, IconButton, Modal} from '@mui/material';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';

import ChatRoom from './index';

function ChatButton() {
  const [openChat, setOpenChat] = useState(false);
  return (
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
      <IconButton onClick={() => setOpenChat(true)}>
        <ChatRoundedIcon sx={{width: 40, height: 40, color: 'green'}} />
      </IconButton>
      <Modal
        open={openChat}
        onClose={() => {
          setOpenChat(false);
        }}
      >
        <ChatRoom />
      </Modal>
    </Badge>
  );
}

export default ChatButton;
