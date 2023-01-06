import React from 'react';
import {Outlet} from 'react-router-dom';
import {Box, Grid} from '@mui/material';
import Header from './Header';
import WPHeader from './WPHeader';
import SideBar from './SideBar';
import ChatButton from 'src/components/chat/ChatButton';

function Layout(props) {
  return (
    <div>
      {props.wp ? <WPHeader /> : <Header />}
      <div style={{height: '48px'}}> </div>
      <Box sx={{flexGrow: 1}}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <SideBar />
          </Grid>
          <Grid item xs={10}>
            <Box sx={{p: 4}}>
              <Outlet />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ChatButton />
    </div>
  );
}

export default Layout;
