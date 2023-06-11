import React, {useState, useMemo, useContext} from 'react';
import {useFirestore} from 'src/hooks/useFirestore';
import {AppContext} from './AppProvider';

export const DocContext = React.createContext();

export default function DocProvider({children}) {
  const {project} = useContext(AppContext);

  const [selectedProjectId, setSelectedProjectId] = useState(project.id);
  const [selectedParentId, setSelectedParentId] = useState('');
  const [selectedParentName, setSelectedParentName] = useState('');
  const [prevParent, setPrevParent] = useState();
  const [folderTree, setFolderTree] = useState([]);

  const setParent = (id, name) => {
    setPrevParent(selectedParentId, selectedParentName);
    setSelectedParentId(id);
    setSelectedParentName(name);
    const newFolderTree = folderTree.concat([{id: id, name: name}]);
    setFolderTree(newFolderTree);
    console.log('Folder tree selected', newFolderTree);
  };

  const setParentOnBreadcrumb = (id) => {
    const idlist = folderTree.map((item) => item.id);
    const newTree = folderTree.slice(0, idlist.indexOf(id));
    console.log(newTree);
  };

  const onBack = () => {
    const newTree = folderTree;
    const newParent = newTree.at(-2);
    console.log(newParent);
    if (newParent) setParent(newParent.id, newParent.name);
    else setParent('', '');
    newTree.pop();
    setFolderTree(newTree);
  };

  // const {
  //   user: {uid},
  // } = useContext(AuthContext);

  const docsCondition = useMemo(
    () =>
      selectedParentId
        ? {
            fieldName: 'parentId',
            operator: '==',
            compareValue: selectedParentId,
          }
        : {},
    [selectedParentId],
  );

  const rawAllDocs = useFirestore(
    `projects/${selectedProjectId}/documents`,
    docsCondition,
  );

  var rawFolders = [];
  var rawFiles = [];
  if (rawAllDocs) {
    for (var doc of rawAllDocs) {
      if (doc.type === 'folder') {
        rawFolders.push(doc);
      } else {
        rawFiles.push(doc);
      }
    }
  }

  const rawDocuments = rawFolders.concat(rawFiles);

  // const rawFolders

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
        setParentOnBreadcrumb,
        onBack,
      }}
    >
      {children}
    </DocContext.Provider>
  );
}
