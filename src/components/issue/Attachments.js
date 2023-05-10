import { useState, useMemo } from 'react';
import {
  Typography, Paper,
  IconButton, Box
} from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import { useFirestore } from 'src/hooks/useFirestore';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import WarningPopup from 'src/components/popup/Warning';

import { deleteDocument } from 'src/firebase/firestoreServices';

function Attachments({issueId, uid}) {
  const attachmentsCondition = useMemo(
    () => ({
      sort: 'desc',
      sortAttr: 'createdAt',
    }),
    [issueId],
  );

  const attachments = useFirestore(
    `issues/${issueId}/documents`,
    attachmentsCondition,
  );
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
      {attachments.length ? (
        <Typography sx={{marginTop: 3, fontSize: 16, fontWeight: 700}}>
          Attachments
        </Typography>
      ) : (
        ''
      )}
      <Box
        sx={{
          paddingTop: '8px',
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
        onClose={() => setOpenDeletePopup(false)}
        title={'Do you really want to delete this file?'}
        content={'This file will be permanently deleted'}
      />
    </Box>
  );
}

export default Attachments;
