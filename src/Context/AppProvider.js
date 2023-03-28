import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

export const AppContext = React.createContext();

function AppProvider({children}) {
  const [workspace, setWorkspace] = useState({});
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [admin, setAdmin] = useState({});

  return (
    <AppContext.Provider
      value={{
        workspace,
        setWorkspace,
        projects,
        setProjects,
        project,
        setProject,
        admin,
        setAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
