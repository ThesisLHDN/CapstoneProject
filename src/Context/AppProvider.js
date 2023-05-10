import React, { useState } from 'react';

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
