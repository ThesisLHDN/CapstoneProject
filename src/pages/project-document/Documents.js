import {useMemo, useState} from 'react';

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
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

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
  const [selectedParentId, setSelectedParentId] = useState(parentId);
  console.log('selectedParentId', selectedParentId);
  const [file, setFile] = useState();

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

  const rawDocuments = useFirestore(
    `projects/${projectId}/documents`,
    docsCondition,
  );
  const documents = rawDocuments.filter((item) => !item.parentId);
  console.log('documents', documents);

  const rootDocument = folders
    .concat(files)
    .filter((item) => item.parent === '');

  console.log('root document', rootDocument);

  return (
    <div>
      {documents && documents.length ? (
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
          <AddItem />

          {/* {rootDocument.map((item) => {
            return (
              <Grid container sx={{marginTop: 1, marginBottom: 1}}>
                <Grid item xs={3}>
                  <Grid container>
                    {item.hasOwnProperty('children') ? (
                      <div>
                        <KeyboardArrowRightOutlinedIcon
                          sx={{marginTop: 1.5, marginRight: 0.5}}
                        />
                        <FolderOutlinedIcon
                          sx={{width: 32, height: 32, marginTop: 0.9}}
                        />
                      </div>
                    ) : (
                      <DescriptionOutlinedIcon
                        sx={{
                          width: 32,
                          height: 32,
                          marginTop: 0.9,
                          marginLeft: 3.5,
                        }}
                      />
                    )}
                    <Typography
                      sx={{
                        marginTop: 1.5,
                        marginLeft: 1,
                        fontSize: 14,
                        cursor: 'pointer',
                        '&:hover': {textDecoration: 'underline'},
                      }}
                      onClick={() => {}}
                    >
                      {item.name}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={4}>
              <Typography sx={{marginTop: 1.5, fontSize: 14}}>
                <span className="font-bold">Created by </span>
                {item.createBy}
              </Typography>
            </Grid>

                <Grid item xs={4}></Grid>

                <Grid item xs={3}>
                  <Typography sx={{marginTop: 1.5, fontSize: 14}}>
                    <span className="font-bold">Updated on </span>
                    {convertDate(item.updateOn)}
                  </Typography>
                </Grid>

                <Grid item xs={2}>
                  <Grid container sx={{justifyContent: 'flex-end'}}>
                    <IconButton size="medium">
                  <ShareOutlinedIcon sx={{color: '#181818'}} />
                </IconButton>
                    <IconButton size="medium">
                      <MoreHorizOutlinedIcon sx={{color: '#181818'}} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            );
          })} */}
          {documents.map((item) => {
            return (
              <Grid
                container
                sx={{marginTop: 1, marginBottom: 1}}
                key={item.id}
                onClick={() => setSelectedParentId(item.id)}
              >
                <Grid item xs={3}>
                  <Grid container>
                    {item.hasOwnProperty('childrens') ? (
                      <div>
                        <KeyboardArrowRightOutlinedIcon
                          sx={{marginTop: 1.5, marginRight: 0.5}}
                        />
                        <FolderOutlinedIcon
                          sx={{width: 32, height: 32, marginTop: 0.9}}
                        />
                      </div>
                    ) : item.type === 'folder' ? (
                      <FolderOutlinedIcon
                        sx={{
                          width: 32,
                          height: 32,
                          marginTop: 0.9,
                          marginLeft: 3.5,
                        }}
                      />
                    ) : (
                      <DescriptionOutlinedIcon
                        sx={{
                          width: 32,
                          height: 32,
                          marginTop: 0.9,
                          marginLeft: 3.5,
                        }}
                      />
                    )}
                    <Typography
                      sx={{
                        marginTop: 1.5,
                        marginLeft: 1,
                        fontSize: 14,
                        cursor: 'pointer',
                        '&:hover': {textDecoration: 'underline'},
                      }}
                      onClick={() => {}}
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

                <Grid item xs={4}></Grid>

                <Grid item xs={3}>
                  <Typography sx={{marginTop: 1.5, fontSize: 14}}>
                    <span className="font-bold">Updated on </span>
                    {convertDate(item.updatedAt.toDate())}
                  </Typography>
                </Grid>

                <Grid item xs={2}>
                  <Grid container sx={{justifyContent: 'flex-end'}}>
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
    </div>
  );
}

export default Document;
