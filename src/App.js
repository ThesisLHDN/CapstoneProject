import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import Header from "src/components/layout/Header";
// import Button from "@mui/material/Button";

import Home from "src/pages/Home";
import WorkspaceSetting from "./pages/workspace-setting/WorkspaceSetting";
import ProjectSetting from "./pages/project-setting/ProjectSetting";
import Dashboard from "./pages/dashboard/Dashboard";
import SideBar from "./components/layout/SideBar";
import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Board from "./pages/board/Board";
import Backlog from "./pages/backlog/Backlog";
import Document from "./pages/project-document/Documents";

function App() {
  return (
    <div className="App">
      <Header />

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <SideBar />
          </Grid>
          <Grid item xs={10}>
            <Box sx={{ p: 4 }}>
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
                ></Route>{" "}
                <Route path="/board" element={<Board />}></Route>
                <Route path="/backlog" element={<Backlog />} />
                <Route path="/document" element={<Document />} />
              </Routes>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
