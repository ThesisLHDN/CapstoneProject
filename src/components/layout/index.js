import {useContext, useMemo, useState} from 'react';
import {Outlet} from 'react-router-dom';
import {Box, Grid, IconButton} from '@mui/material';
import Header from './Header';
import WPHeader from './WPHeader';
import SideBar from './SideBar';
import ChatRoom from '../chat';
import {color} from 'src/style';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';

import ChatButton from 'src/components/chat/ChatButton';
import {AuthContext} from 'src/Context/AuthProvider';
import {AppContext} from 'src/Context/AppProvider';
import ChatProvider from 'src/Context/ChatProvider';
function Layout({pf, wp}) {
  const {user} = useContext(AuthContext);
  const {
    project: {id},
  } = useContext(AppContext);
  const [openChat, setOpenChat] = useState(false);
  const Chat = useMemo(
    () => (
      // <ChatProvider>
      <ChatRoom
        openChat={openChat}
        onCloseChat={() => {
          setOpenChat(false);
        }}
        currentUser={user}
        projectId={id}
      />
      // </ChatProvider>
    ),
    [openChat],
  );

  const Children = useMemo(() => <Outlet />, [id]);

  // const Chat = useMemo(
  //   () => <ChatButton currentUser={user} projectId={id} />,
  //   [id],
  // );

  return (
    <div>
      {wp ? <WPHeader /> : <Header />}
      <div style={{height: '48px'}}> </div>
      <Box sx={{flexGrow: 1}}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            {pf ? <></> : <SideBar wp={wp} />}
          </Grid>
          <Grid item xs={10}>
            <Box sx={{p: 4}}>
              {Children}
              {/* <Outlet /> */}
              {/* <Outlet /> */}
            </Box>
          </Grid>
        </Grid>
      </Box>{' '}
      {/* {!wp && !pf && (
        <ChatProvider>
          <IconButton
            aria-label="chat-button"
            onClick={() => setOpenChat(true)}
            sx={{position: 'fixed', bottom: 40, right: 40}}
          >
            <ChatRoundedIcon
              sx={{width: 40, height: 40, color: color.green03}}
            />
          </IconButton>{' '}
          {Chat}
        </ChatProvider>
      )} */}
      {!wp && !pf && (
        <ChatProvider>
          <ChatButton currentUser={user} projectId={id} />
        </ChatProvider>
      )}
    </div>
  );
}

export default Layout;
