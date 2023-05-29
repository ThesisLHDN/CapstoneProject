import React from 'react';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import {Box, Typography} from '@mui/material';
function Priority({priority, text}) {
  return (
    <div>
      {priority && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: `${
              priority === 'Critical'
                ? 'red'
                : priority === 'High'
                ? 'coral'
                : priority === 'Medium'
                ? 'orange'
                : priority === 'Low'
                ? 'green'
                : 'blue'
            }`,
          }}
        >
          {priority === 'Critical' ? (
            <KeyboardDoubleArrowUpRoundedIcon />
          ) : priority === 'High' ? (
            <ExpandLessRoundedIcon />
          ) : priority === 'Medium' ? (
            <DragHandleRoundedIcon />
          ) : priority === 'Low' ? (
            <KeyboardArrowDownRoundedIcon />
          ) : (
            <KeyboardDoubleArrowDownRoundedIcon />
          )}{' '}
          {text && (
            <Typography variant="subtitle2" sx={{ml: 1, color: 'black'}}>
              {priority}
            </Typography>
          )}
        </Box>
      )}
    </div>
  );
}

export default Priority;
