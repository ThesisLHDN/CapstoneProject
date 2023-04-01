import {useContext, useMemo, useState} from 'react';

import SearchBar from 'src/components/search';
import Sort from 'src/components/Sort';
import AddItem from './AddItem';
import {useFirestore} from 'src/hooks/useFirestore';
import WarningPopup from 'src/components/popup/Warning';

import {
  Typography,
  Box,
  Button,
  Grid,
  Breadcrumbs,
  Link,
  IconButton,
  CircularProgress,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
// import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import {DocContext} from 'src/Context/DocProvider';
import {deleteDocument} from 'src/firebase/firestoreServices';
import {styled} from '@mui/system';
import {useLocation} from 'react-router-dom';
import {AppContext} from 'src/Context/AppProvider';

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
    setParent,
    rawDocuments,
  } = useContext(DocContext);

  const location = useLocation();
  const projectId = location.pathname.split('/')[2];
  const {workspace, project} = useContext(AppContext);

  setSelectedProjectId(projectId);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

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
    setSelectedFile();
  };

  // const rootDocument = folders
  //   .concat(files)
  //   .filter((item) => item.parent === '');

  // console.log('root document', rootDocument);

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
                  href={`/workspace-setting/${workspace.id}`}
                  onClick={() => {}}
                  sx={{fontFamily: 'Open Sans, sans-serif'}}
                >
                  {workspace.wsname}
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

          <Box
            sx={{
              display: 'flex',
              gap: 1,
              gridTemplateColumns: 'repeat(4, 1fr)',
              mt: 2,
            }}
          >
            <SearchBar sx={{width: '210px'}} />
            <Sort />
            <Button
              variant="text"
              startIcon={<VisibilityOutlinedIcon />}
              sx={{color: '#181818', textTransform: 'none'}}
            >
              View
            </Button>
          </Box>
          <AddItem parentId={selectedParentId} projectId={selectedProjectId} />
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
                <Grid item xs={7}>
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
                        <PlainButton startIcon={<DescriptionOutlinedIcon />}>
                          {/* <DescriptionOutlinedIcon
                            sx={{
                              width: 32,
                              height: 32,
                              marginTop: 0.9,
                              marginLeft: 3.5,
                              cursor: 'pointer',
                            }}
                          /> */}

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

                {/* <Grid item xs={4}></Grid> */}

                <Grid item xs={3}>
                  <Typography sx={{fontSize: 14}}>
                    <span className="font-bold">Updated on </span>
                    {item.updatedAt ? convertDate(item.updatedAt.toDate()) : ''}
                  </Typography>
                </Grid>

                <Grid item xs={2}>
                  <Grid container sx={{justifyContent: 'flex-end'}}>
                    {item.type !== 'folder' && (
                      <a href={item.downloadURL} download target="_blank">
                        <IconButton>
                          <DownloadRoundedIcon
                            sx={{color: '#181818'}}
                          ></DownloadRoundedIcon>
                        </IconButton>
                      </a>
                    )}
                    <IconButton
                      size="medium"
                      onClick={() => {
                        setOpenDeletePopup(true);
                        setSelectedFile({id: item.id, name: item.name});
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
            onClose={() => setOpenDeletePopup(false)}
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
      {/* </DocProvider> */}
    </div>
  );
}

export default Document;
