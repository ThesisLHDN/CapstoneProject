import React, {useState, useContext, useMemo} from 'react';
import DatePicker from 'react-datepicker';
import {
  Grid,
  Typography,
  Button,
  TextField,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Paper,
  IconButton,
  Popper,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import 'react-datepicker/dist/react-datepicker.css';
import Comments from './comment/Comments';
import ChildIssues from './ChildIssues';
import {useFirestore} from 'src/hooks/useFirestore';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import WarningPopup from 'src/components/popup/Warning';

import {storage} from 'src/firebase/config';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {addDocument, deleteDocument} from 'src/firebase/firestoreServices';
import {AuthContext} from 'src/Context/AuthProvider';

function Attachments({issueId, uid, attachments}) {
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  const deleteFileHandler = (confirmed) => {
    const path = `issues/${issueId}/documents`;

    console.log('delete', path, selectedFile);
    deleteDocument(path, selectedFile.id);

    setSelectedFile();
    setOpenDeletePopup(false);
  };

  return (
    <Box>
      {' '}
      <Typography sx={{marginTop: 3, fontSize: 16, fontWeight: 700}}>
        Attachments
      </Typography>
      <Box
        sx={{
          fontSize: '12px !important',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 140px)',
          gridGap: '1rem',
          justifyContent: 'space-between',
        }}
      >
        {attachments &&
          attachments.map((file) => (
            <Paper
              sx={{
                width: '100%',

                backgroundColor: '#efefef',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  height: 80,
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: '#adadad',
                    '& .buttons': {display: 'block'},
                  },
                  '&:hover .buttons': {
                    display: 'block',
                  },
                }}
              >
                <DescriptionOutlinedIcon
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                  }}
                ></DescriptionOutlinedIcon>{' '}
                <Box className={'buttons'} sx={{display: 'none'}}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      gap: 1,
                    }}
                  >
                    <a href={file.downloadURL} target="_blank">
                      <IconButton
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: '4px',
                          backgroundColor: '#efefef',
                        }}
                      >
                        <DownloadRoundedIcon sx={{color: '#181818'}} />
                      </IconButton>
                    </a>

                    <IconButton
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '4px',
                        backgroundColor: '#efefef',
                      }}
                      onClick={() => {
                        setOpenDeletePopup(true);
                        setSelectedFile({id: file.id, name: file.name});
                      }}
                    >
                      <DeleteOutlineRoundedIcon sx={{color: '#181818'}} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  p: 1,
                  backgroundColor: 'white',
                  width: '100%',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <p
                  style={{
                    overflow: 'hidden',
                    width: '100%',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {' '}
                  {file.name}
                </p>
              </Box>
            </Paper>
          ))}
      </Box>
      <WarningPopup
        open={openDeletePopup}
        handleSubmit={deleteFileHandler}
        onClose={setOpenDeletePopup(false)}
      />
    </Box>
  );
}

export default Attachments;
