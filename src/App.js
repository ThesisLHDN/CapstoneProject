import './App.css';
import {useContext, useState} from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';

// import {Box, Grid, Badge, IconButton, Modal} from '@mui/material';
// import ChatRoundedIcon from '@mui/icons-material/ChatRounded';

import Layout from 'src/components/layout';
import AuthLayout from 'src/components/layout/AuthLayout';
// import ChatRoom from './components/ChatRoom';
// import ChatButton from './components/ChatRoom/ChatButton';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgetPassword from './components/auth/ForgetPassword';

// import Home from './pages/Home';
import RoadMap from './pages/roadmap';
import Issue from './pages/issue/Issue';
import Board from './pages/board/Board';
import Backlog from './pages/backlog/Backlog';
import Profile from './pages/profile/Profile';
import Dashboard from './pages/dashboard/Dashboard';
import Document from './pages/project-document/Documents';
import ProjectSetting from './pages/project-setting/ProjectSetting';
import WorkspaceSetting from './pages/workspace-setting/WorkspaceSetting';

import AuthProvider from 'src/Context/AuthProvider';
import CreateWorkspace from './components/popup/CreateWorkspace';
import AppProvider from './Context/AppProvider';
import CreateProject from './components/popup/CreateProject';
import DocProvider from './Context/DocProvider';
// import ChatProvider from './Context/ChatProvider';
// import DocProvider from './Context/DocProvider';

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <AuthProvider>
      <AppProvider>
        <div className="App">
          {/* <Layout> */}
          <Routes location={background || location}>
            <Route path="/">
              <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />}></Route>
                <Route path="signup" element={<Signup />}></Route>
                <Route path="forget" element={<ForgetPassword />}></Route>
                <Route
                  path="create-workspace"
                  element={<CreateWorkspace />}
                ></Route>
              </Route>
              <Route element={<Layout />}>
                {/* <Route path="" element={<RoadMap />}></Route> */}
                <Route
                  path="project-setting/:id"
                  element={<ProjectSetting></ProjectSetting>}
                ></Route>
                <Route
                  path="dashboard/:id"
                  element={<Dashboard></Dashboard>}
                ></Route>
                <Route path="board/:id" element={<Board />}></Route>
                <Route path="roadmap/:id" element={<RoadMap />}></Route>
                <Route path="backlog/:id" element={<Backlog />} />
                <Route
                  path="document/:id"
                  element={
                    <DocProvider>
                      <Document />
                    </DocProvider>
                  }
                />
                <Route path="issue/:id/:id" element={<Issue />} />
              </Route>
              <Route element={<Layout pf />}>
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route element={<Layout wp />}>
                <Route
                  path="/workspace-setting/:id"
                  element={<WorkspaceSetting></WorkspaceSetting>}
                >
                  <Route
                    path="create-project"
                    element={<CreateProject />}
                  ></Route>
                </Route>
              </Route>
            </Route>
          </Routes>
          {background && (
            <Routes>
              <Route path="create-project" element={<CreateProject />}></Route>
            </Routes>
          )}
        </div>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
