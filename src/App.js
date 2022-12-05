import './App.css';
import {Routes, Route} from 'react-router-dom';
import {Box, Grid} from '@mui/material';

import Header from 'src/components/layout/Header';
import Login from 'src/components/authentication/Login';
import Signup from 'src/components/authentication/Signup';
import ForgetPassword from 'src/components/authentication/ForgetPassword';
import SideBar from 'src/components/layout/SideBar';
import ChatRoom from 'src/components/ChatRoom';

import Home from 'src/pages/Home';
import WorkspaceSetting from './pages/workspace-setting/WorkspaceSetting';
import ProjectSetting from './pages/ProjectSetting';
import Dashboard from './pages/Dashboard';
import Board from './pages/board/Board';
import RoadMap from './pages/roadmap';

import AuthProvider from 'src/Context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <div style={{height: '48px'}}> </div>
        <Box sx={{flexGrow: 1}}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <SideBar />
            </Grid>
            <Grid item xs={10}>
              <Box sx={{p: 4}}>
                <Routes>
                  <Route path="/" element={<Home></Home>}></Route>
                  <Route
                    path="/project-setting"
                    element={<ProjectSetting></ProjectSetting>}
                  ></Route>
                  <Route
                    path="/dashboard"
                    element={<Dashboard></Dashboard>}
                  ></Route>
                  <Route
                    path="/workspace-setting"
                    element={<WorkspaceSetting></WorkspaceSetting>}
                  ></Route>{' '}
                  <Route path="/board" element={<Board />}></Route>
                  <Route path="/roadmap" element={<RoadMap />}></Route>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/signup" element={<Signup />}></Route>
                  <Route path="/forget" element={<ForgetPassword />}></Route>
                  <Route path="/chat" element={<ChatRoom />}></Route>
                </Routes>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </AuthProvider>
  );
}

export default App;
