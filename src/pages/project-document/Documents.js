import {useContext, useMemo, useState} from 'react';

import SearchBar from 'src/components/search';
import Sort from 'src/components/Sort';
import AddItem from './AddItem';
import WarningPopup from 'src/components/popup/Warning';
import TextEditor from './QuillEditor/Editor';
import {addDocument, updateDocument} from 'src/firebase/firestoreServices';

import {
  Typography,
  Button,
  Grid,
  Breadcrumbs,
  Link,
  IconButton,
  CircularProgress,
} from '@mui/material';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import {DocContext} from 'src/Context/DocProvider';
import {deleteDocument} from 'src/firebase/firestoreServices';
import {styled} from '@mui/system';
import {useLocation} from 'react-router-dom';
import {AppContext} from 'src/Context/AppProvider';
import {AuthContext} from 'src/Context/AuthProvider';
import {colorHover} from 'src/style';

function convertDate(d) {
  const date = new Date(d);
  return (
    date.toLocaleString('en-us', {month: 'short'}) +
    ' ' +
    date.getDate() +
    ', ' +
    date.getFullYear()
  );
}

const PlainButton = styled(Button)({
  color: '#181818',
  textTransform: 'none',
  '& :hover': {backgroundColor: '#eee'},
});

function Document({parentId}) {
  const {
    selectedParentId,
    selectedProjectId,
    setSelectedProjectId,
    onBack,
    setParent,
    rawDocuments,
  } = useContext(DocContext);

  const location = useLocation();
  const projectId = location.pathname.split('/')[2];
  const {
    user: {uid},
  } = useContext(AuthContext);
  const {workspace, project} = useContext(AppContext);

  setSelectedProjectId(projectId);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState({
    name: 'Untitled',
    body: '',
  });

  const documents = rawDocuments
    ? rawDocuments.filter(
        (item) => item.parentId === (selectedParentId ? selectedParentId : ''),
      )
    : [];
  console.log('documents', rawDocuments, documents);

  const deleteFileHandler = (confirmed) => {
    const path = `projects/${selectedProjectId}/documents`;
    console.log('delete', path, selectedFile);

    deleteDocument(path, selectedFile.id);

    setOpenDeletePopup(false);
    setSelectedFile({name: 'Untitled', body: ''});
  };

  const [openEditor, setOpenEditor] = useState(false);
  const [enableEditText, setEnableEditText] = useState(true);

  const onSubmitTextEditor = (file) => {
    console.log('text editor', file);
    if (file) {
      if (!file.id) {
        console.log('create');
        const TextData = {
          authorId: uid,
          name: file.name,
          parentId: selectedParentId,
          type: file.type,
          body: file.body,
        };
        console.log('new doc added', TextData);
        addDocument(`projects/${projectId}/documents`, TextData);
      } else {
        updateDocument(`projects/${projectId}/documents`, file.id, {
          name: file.name,
          body: file.body,
        });
        console.log('edit', file.id, file.name, file.body);
      }
    }

    setOpenEditor(false);
    // setOpenEditPopup(false);
    setSelectedFile({name: 'Untitled', body: ''});
    setEnableEditText(true);
  };

  const docButton = (doc) => {
    switch (doc.type) {
      case 'folder':
        return (
          <PlainButton
            startIcon={<FolderOutlinedIcon />}
            onClick={() => (doc ? setParent(doc.id, doc.name) : null)}
          >
            {doc.name}
          </PlainButton>
        );
      case 'editableHTML':
        return (
          <PlainButton
            startIcon={<DescriptionOutlinedIcon />}
            onClick={(doc) => {
              setOpenEditor(true);
              setSelectedFile(doc);
            }}
          >
            {doc.name}
          </PlainButton>
        );
      default:
        return (
          <a href={doc.downloadURL} target="_blank" download>
            <PlainButton
              startIcon={<DescriptionOutlinedIcon />}
              onClick={() => {
                setOpenEditor(true);
                setSelectedFile(doc);
                // setEnableEditText(false);
              }}
            >
              {doc.name}
            </PlainButton>
          </a>
        );
    }
  };

  return (
    <div>
      {documents ? (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{mb: 2}}>
                <Link
                  underline="hover"
                  key="1"
                  color="inherit"
                  href={`/workspace-setting/${project.workspaceId}?user=${uid}`}
                  onClick={() => {}}
                  sx={{fontFamily: 'Open Sans, sans-serif'}}
                >
                  {project.wsname}
                </Link>
                <Link
                  underline="hover"
                  key="2"
                  color="inherit"
                  href={`/roadmap/${project.id}`}
                  onClick={() => {}}
                  sx={{fontFamily: 'Open Sans, sans-serif'}}
                >
                  {project.pname}
                </Link>
                <Typography
                  key="3"
                  color="text.primary"
                  sx={{fontSize: 'inherit'}}
                >
                  Documents
                </Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>

          <Typography variant="h5" sx={{color: 'green', fontWeight: 700}}>
            Documents
          </Typography>

          {selectedParentId && (
            <Button
              color="success"
              variant="contained"
              sx={{mt: 1, ...colorHover.greenBtn}}
              onClick={onBack}
            >
              Back
            </Button>
          )}

          {/* <Box
            sx={{
              display: 'flex',
              gap: 1,
              gridTemplateColumns: 'repeat(4, 1fr)',
              mt: 2,
            }}
          >
            {/* <SearchBar sx={{width: '210px'}} /> */}
          {/* <Sort />
            <Button
              variant="text"
              startIcon={<VisibilityOutlinedIcon />}
              sx={{color: '#181818', textTransform: 'none'}}
            >
              View
            </Button>
          </Box> */}
          <AddItem
            parentId={selectedParentId}
            projectId={selectedProjectId}
            onClose={() => {
              setSelectedFile({name: 'Untitled', body: ''});
              setOpenEditor(true);
            }}
          />
          {documents.map((item) => {
            return (
              <Grid
                container
                sx={{
                  marginTop: 1,
                  marginBottom: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
                key={item.id}
              >
                <Grid item xs={5}>
                  <Grid container>
                    {item.type === 'folder' ? (
                      <PlainButton
                        startIcon={<FolderOutlinedIcon />}
                        onClick={() =>
                          item ? setParent(item.id, item.name) : null
                        }
                      >
                        {item.name}
                      </PlainButton>
                    ) : (
                      <a href={item.downloadURL} target="_blank" download>
                        <PlainButton
                          startIcon={<DescriptionOutlinedIcon />}
                          onClick={() => {
                            if (item.type === 'editableHTML') {
                              setOpenEditor(true);
                              setSelectedFile(item);
                            }
                          }}
                        >
                          {item.name}
                        </PlainButton>
                      </a>
                    )}
                  </Grid>
                </Grid>
                {/* <Grid item xs={4}>
                  <Typography sx={{marginTop: 1.5, fontSize: 14}}>
                    <span className="font-bold">Created by </span>
                    {item.createBy}
                  </Typography>
                </Grid> */}
                <Grid item xs={2}>
                  <Typography sx={{fontSize: 14}}>
                    <span className="font-bold">Type: </span>
                    {item.type.split('/').at(-1)}
                  </Typography>
                </Grid>
                {/* <Grid item xs={4}></Grid> */}
                <Grid item xs={3}>
                  <Typography sx={{fontSize: 14}}>
                    <span className="font-bold">Updated on </span>
                    {item.updatedAt ? convertDate(item.updatedAt.toDate()) : ''}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Grid container sx={{justifyContent: 'flex-end'}}>
                    {item.type === 'editableHTML' && (
                      <IconButton>
                        <EditRoundedIcon
                          sx={{color: '#181818'}}
                          onClick={() => {
                            setOpenEditor(true);
                            setSelectedFile(item);
                            // setEnableEditText(false);
                          }}
                        ></EditRoundedIcon>
                      </IconButton>
                    )}

                    {item.type !== 'folder' && item.type !== 'editableHTML' && (
                      <a href={item.downloadURL} download target="_blank">
                        <IconButton>
                          <DownloadRoundedIcon
                            sx={{color: '#181818'}}
                          ></DownloadRoundedIcon>
                        </IconButton>
                      </a>
                    )}
                    {/* {item.name} */}
                    <IconButton
                      size="medium"
                      onClick={() => {
                        setOpenDeletePopup(true);
                        setSelectedFile(item);
                      }}
                    >
                      <DeleteOutlineRoundedIcon sx={{color: '#e02828'}} />
                      {/* <MoreHorizOutlinedIcon  /> */}
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
          <WarningPopup
            title={`Do you really want to delete "${
              selectedFile ? selectedFile.name : null
            }"`}
            open={openDeletePopup}
            handleSubmit={deleteFileHandler}
            onClose={() => {
              setOpenDeletePopup(false);
              setSelectedFile({name: 'Untitled', body: ''});
            }}
            content="This file will be permanently deleted"
          ></WarningPopup>
        </div>
      ) : (
        <CircularProgress
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(50%,-50%)',
          }}
        />
      )}
      <TextEditor
        open={openEditor}
        onClose={onSubmitTextEditor}
        editing={false}
        file={selectedFile}
      />
    </div>
  );
}

export default Document;
