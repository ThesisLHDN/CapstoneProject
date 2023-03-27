import React, {useState} from 'react';

export const AppContext = React.createContext();

function AppProvider({children}) {
  const [workspace, setWorkspace] = useState({});
  const [projects, setProjects] = useState([]);
  return (
    <AppContext.Provider
      value={{workspace, setWorkspace, projects, setProjects}}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
