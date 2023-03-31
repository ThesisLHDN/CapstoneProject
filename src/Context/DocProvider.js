import {AuthContext} from './AuthProvider';
import React, {useState, useMemo, useContext} from 'react';
import {useFirestore} from 'src/hooks/useFirestore';
import {AppContext} from './AppProvider';
// TODO default value for project Id

export const DocContext = React.createContext();

export default function DocProvider({children}) {
  const {project} = useContext(AppContext);

  const [selectedProjectId, setSelectedProjectId] = useState(project.id);
  const [selectedParentId, setSelectedParentId] = useState('');
  const [selectedParentName, setSelectedParentName] = useState('');
  const [prevParent, setPrevParent] = useState();

  const setParent = (id, name) => {
    setPrevParent(selectedParentId, selectedParentName);
    setSelectedParentId(id);
    setSelectedParentName(name);
  };

  const {
    user: {uid},
  } = useContext(AuthContext);

  const docsCondition = useMemo(
    () =>
      selectedParentId
        ? {
            fieldName: 'parentId',
            operator: '==',
            compareValue: selectedParentId ? selectedParentId : '',
          }
        : {},
    [selectedParentId],
  );

  const rawDocuments = useFirestore(
    `projects/${selectedProjectId}/documents`,
    docsCondition,
  );

  return (
    <DocContext.Provider
      value={{
        selectedProjectId,
        setSelectedProjectId,
        selectedParentId,
        setSelectedParentId,
        setParent,
        selectedParentName,
        rawDocuments,
        prevParent,
      }}
    >
      {children}
    </DocContext.Provider>
  );
  // value is the thing that all children can access
}
