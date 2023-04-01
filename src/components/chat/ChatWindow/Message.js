import React from 'react';
import format from 'date-fns/format';
import moment from 'moment/moment';

import {Box, Paper, Typography, Avatar} from '@mui/material';

import {differenceInDays} from 'date-fns';

function Message({mine, children}) {
  const {author, authorId, body, type, createdAt} = children;
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
            src="#"
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
            maxWidth: '75%',
            ...(mine
              ? {backgroundColor: '#04BF00', color: 'white'}
              : {backgroundColor: '#DADADA'}),
            borderRadius: '25px',
            // my: 2,
            py: 1,
            px: 2,
            right: '0px',
            '&:hover + .sendDate': {
              display: 'inline-block',
            },
          }}
        >
          <Typography variant="body2">{body}</Typography>
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
