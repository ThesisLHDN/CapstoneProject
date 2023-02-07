import React from 'react';
import format from 'date-fns/format';

import { Box, Paper, Typography, Avatar } from '@mui/material';

import { differenceInDays } from 'date-fns';

function Message({ mine, children }) {
  const { senderName, senderId, message, time } = children;
  // const dateDisplay = time;
  switch (differenceInDays(new Date(), time)) {
    case 0:
      var dateDisplay = 'Today, ' + format(time, 'hh:mm');
      break;
    case 1:
      dateDisplay = 'Yesterday, ' + format(time, 'hh:mm');
      break;
    default:
      dateDisplay = format(time, 'dd-MM, hh:mm');
      break;
    // ! must check for year diff
  }
  // if (differenceInDays(time, new Date())==0) {dateDisplay =}
  // console.log(differenceInDays(new Date(), time));
  return (
    <Box
      sx={{
        display: 'flex',
        // alignItems: mine ? 'flex-end' : 'flex-start',
        flexDirection: 'column',
      }}
    >
      {!mine && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src="#"
            alt={senderName}
            sx={{ width: 32, height: 32, mr: 1 }}
          ></Avatar>
          <Typography variant="body2">{senderName}</Typography>
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
        <Paper
          elevation={0}
          sx={{
            maxWidth: '75%',
            ...(mine
              ? { backgroundColor: '#04BF00', color: 'white' }
              : { backgroundColor: '#DADADA' }),
            borderRadius: '25px',
            my: 2,
            py: 1,
            px: 2,
            right: '0px',
            '&:hover + .sendDate': {
              display: 'inline-block',
            },
          }}
        >
          <Typography variant="body2">{message}</Typography>
        </Paper>
        <Typography
          className="sendDate"
          variant="subtitle2"
          sx={{ textAlign: 'right', display: 'none' }}
        >
          {dateDisplay}
        </Typography>
      </Box>
    </Box>
  );
}

export default Message;
