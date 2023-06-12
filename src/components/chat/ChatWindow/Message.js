import moment from 'moment/moment';

import {Box, Paper, Typography, Avatar, IconButton} from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

function Message({mine, children}) {
  const {author, body, createdAt, file} = children;
  var timepassed = '';
  if (createdAt) {
    const start = moment(createdAt.toDate());
    timepassed = moment(start, 'MM/DD/YYYY').fromNow();
  }
  // const dateDisplay = 'hehe';
  return (
    <Box
      sx={{
        my: 2,
        display: 'flex',
        // alignItems: mine ? 'flex-end' : 'flex-start',
        flexDirection: 'column',
      }}
    >
      {!mine && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: '5px',
          }}
        >
          <Avatar
            src={author ? author.photoURL : '#'}
            alt={author ? author.displayName : ''}
            sx={{width: 32, height: 32, mr: 1}}
          ></Avatar>
          <Typography variant="body2">
            {author ? author.displayName : ''}
          </Typography>
        </div>
      )}
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          gap: 1,
          flexDirection: mine ? 'row-reverse' : 'row',
        }}
      >
        {' '}
        <Paper
          elevation={0}
          sx={{
            overflow: 'hidden',
            maxWidth: '75%',
            ...(mine
              ? {backgroundColor: '#04BF00', color: 'white'}
              : {backgroundColor: '#DADADA'}),

            right: '0px',
            '&:hover + .sendDate': {
              display: 'inline-block',
            },
            ...(!file
              ? {py: 1, px: 2, borderRadius: '20px'}
              : {border: 'solid 1px green'}),
          }}
        >
          {file ? (
            (file.type.split('/')[0] === 'image' && (
              <img
                src={file.downloadURL}
                alt={'Error displaying image from: ' + body}
              />
            )) ||
            (file.type.split('/')[0] === 'video' && (
              <video controls>
                <source type={file.type} src={file.downloadURL}></source>
              </video>
            )) || (
              <a href={file.downloadURL} target="_blank" rel="noreferrer">
                {' '}
                <Paper
                  sx={{
                    width: '120px',
                    height: '120px',

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
                        <a
                          href={file.downloadURL}
                          target="_blank"
                          rel="noreferrer"
                        >
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
                      position: 'absolute',
                      bottom: 0,
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
              </a>
            )
          ) : (
            <Typography
              variant="body2"
              sx={{
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
              }}
            >
              {body}
            </Typography>
          )}
        </Paper>
        <Typography
          className="sendDate"
          variant="subtitle2"
          sx={{textAlign: 'right', display: 'none'}}
        >
          {timepassed}
        </Typography>
      </Box>
    </Box>
  );
}

export default Message;
