import {AuthContext} from './AuthProvider';
import React, {useState, useMemo, useContext} from 'react';
import {useFirestore} from 'src/hooks/useFirestore';
// TODO default value for project Id

export const DocContext = React.createContext();

export default function DocProvider({children}) {
  const [selectedProjectId, setSelectedProjectId] = useState(
    '1OkWkDDY5XyJjJ16eP70',
  );
  const [selectedParentId, setSelectedParentId] = useState('');
  const [selectedParentName, setSelectedParentName] = useState('');

  const setParent = (id, name) => {
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
        selectedParentId,
        setSelectedParentId,
        setParent,
        selectedParentName,
        rawDocuments,
      }}
    >
      {children}
    </DocContext.Provider>
  );
  // value is the thing that all children can access
}
