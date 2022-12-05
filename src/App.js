import './App.css';
import {Routes, Route} from 'react-router-dom';
import {Box, Grid} from '@mui/material';

import ChatRoom from './components/ChatRoom';
import Header from './components/layout/Header';
import SideBar from './components/layout/SideBar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgetPassword from './components/auth/ForgetPassword';

import Home from './pages/Home';
import RoadMap from './pages/roadmap';
import Issue from './pages/issue/Issue';
import Board from './pages/board/Board';
import Backlog from './pages/backlog/Backlog';
import Dashboard from './pages/dashboard/Dashboard';
import Document from './pages/project-document/Documents';
import ProjectSetting from './pages/project-setting/ProjectSetting';
import WorkspaceSetting from './pages/workspace-setting/WorkspaceSetting';

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
                  <Route path="/backlog" element={<Backlog />} />
                  <Route path="/document" element={<Document />} />
                  <Route path="/issue" element={<Issue />} />
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
