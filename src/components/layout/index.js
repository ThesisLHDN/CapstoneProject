import {useContext} from 'react';
import {Outlet} from 'react-router-dom';
import {Box, Grid} from '@mui/material';
import Header from './Header';
import WPHeader from './WPHeader';
import SideBar from './SideBar';
import ChatButton from 'src/components/chat/ChatButton';

import {AuthContext} from 'src/Context/AuthProvider';
import AppProvider from 'src/Context/AppProvider';
function Layout(props) {
  const {user} = useContext(AuthContext);

  return (
    <AppProvider>
      <div>
        {props.wp ? <WPHeader /> : <Header />}
        <div style={{height: '48px'}}> </div>
        <Box sx={{flexGrow: 1}}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <SideBar wp={props.wp} />
            </Grid>
            <Grid item xs={10}>
              <Box sx={{p: 4}}>
                <Outlet />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <ChatButton currentUser={user} />
      </div>
    </AppProvider>
  );
}

export default Layout;
