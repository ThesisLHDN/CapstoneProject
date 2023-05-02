import {useContext} from 'react';
import {Outlet} from 'react-router-dom';
import {Box, Grid} from '@mui/material';
import Header from './Header';
import WPHeader from './WPHeader';
import SideBar from './SideBar';
import ChatButton from 'src/components/chat/ChatButton';

import {AuthContext} from 'src/Context/AuthProvider';
import {AppContext} from 'src/Context/AppProvider';
import ChatProvider from 'src/Context/ChatProvider';
function Layout(props) {
  const {user} = useContext(AuthContext);
  const {project} = useContext(AppContext);

  return (
    <div>
      {props.wp ? <WPHeader /> : <Header />}
      <div style={{height: '48px'}}> </div>
      <Box sx={{flexGrow: 1}}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            {props.pf ? <></> : <SideBar wp={props.wp} />}
          </Grid>
          <Grid item xs={10}>
            <Box sx={{p: 4}}>
              <Outlet />
            </Box>
          </Grid>
        </Grid>
      </Box>{' '}
      {!props.wp && (
        <ChatProvider>
          <ChatButton currentUser={user} projectId={project.id} />
        </ChatProvider>
      )}
    </div>
  );
}

export default Layout;
