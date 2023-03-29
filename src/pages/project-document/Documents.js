import {useContext, useMemo, useState} from 'react';

import SearchBar from 'src/components/search';
import Sort from 'src/components/Sort';
import AddItem from './AddItem';
import {useFirestore} from 'src/hooks/useFirestore';

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
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DocProvider, {DocContext} from 'src/Context/DocProvider';

const folders = [
  {
    name: 'Folder 1',
    createBy: 'Lam Nguyen',
    updateOn: '05/12/2022',
    parent: '',
    children: [],
  },
  {
    name: 'Folder 2',
    createBy: 'Lam Nguyen',
    updateOn: '05/12/2022',
    parent: '',
    children: [],
  },
];

const files = [
  {
    name: 'File 3',
    createBy: 'Lam Nguyen',
    updateOn: '05/12/2022',
    parent: 'Folder 2',
  },
  {
    name: 'File 4',
    createBy: 'Lam Nguyen',
    updateOn: '05/12/2022',
    parent: '',
  },
];

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

function Document({projectId = '1OkWkDDY5XyJjJ16eP70', parentId}) {
  // const projectId = '1OkWkDDY5XyJjJ16eP70';
  const {selectedParentId, selectedProjectId, setParent, rawDocuments} =
    useContext(DocContext);
  console.log('selectedParentId', selectedParentId);

  const documents = rawDocuments
    ? rawDocuments.filter(
        (item) => item.parentId === (selectedParentId ? selectedParentId : ''),
      )
    : [];
  console.log('documents', rawDocuments, documents);

  const deleteFileHandler = () => {};

  // const rootDocument = folders
  //   .concat(files)
  //   .filter((item) => item.parent === '');

  // console.log('root document', rootDocument);

  return (
    <div>
      {/* <DocProvider> */}
      {documents ? (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{mb: 2}}>
                <Link
                  underline="hover"
                  key="1"
                  color="inherit"
                  href="/workspace-setting"
                  onClick={() => {}}
                >
                  Dang's Workspace
                </Link>
                <Link
                  underline="hover"
                  key="2"
                  color="inherit"
                  href="/roadmap"
                  onClick={() => {}}
                >
                  First Scrum Project
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
                sx={{marginTop: 1, marginBottom: 1}}
                key={item.id}
              >
                <Grid item xs={7}>
                  <Grid container>
                    {item.type === 'folder' ? (
                      <FolderOutlinedIcon
                        sx={{
                          width: 32,
                          height: 32,
                          marginTop: 0.9,
                          marginLeft: 3.5,
                          cursor: 'pointer',
                        }}
                        onClick={() => setParent(item.id, item.name)}
                      />
                    ) : (
                      <a href={item.downloadURL} target="_blank" download>
                        <DescriptionOutlinedIcon
                          sx={{
                            width: 32,
                            height: 32,
                            marginTop: 0.9,
                            marginLeft: 3.5,
                            cursor: 'pointer',
                          }}
                        />
                      </a>
                    )}
                    <Typography
                      sx={{
                        marginTop: 1.5,
                        marginLeft: 1,
                        fontSize: 14,
                      }}
                    >
                      {item.name}
                    </Typography>
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
                  <Typography sx={{marginTop: 1.5, fontSize: 14}}>
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
                    <IconButton size="medium">
                      <MoreHorizOutlinedIcon sx={{color: '#181818'}} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
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
