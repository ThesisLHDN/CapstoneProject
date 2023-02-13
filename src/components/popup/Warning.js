import React from 'react';
import {Box, Paper, Typography, Button} from '@mui/material';
import {color} from 'src/style';
// import { Delete } from '@mui/icons-material';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';

function WarningPopup({
  title,
  content,
  delContent,
  cancelContent,
  icon,
  sx,
  onClose,
}) {
  return (
    <Paper
      sx={{
        width: 300,
        p: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        paddingTop: '5px',
        ...sx,
      }}
    >
      <Box
        sx={{
          minHeight: 40,
          paddingTop: '5px',
          textAlign: 'center',
          borderBottom: 'solid black 1px',
        }}
      >
        {/* {icon && icon} */}
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            alignItems: 'center',
            fontWeight: '700 !important',
            color: color.red,
            '& *': {fontSize: 18},
          }}
        >
          {icon && <ReportRoundedIcon />}
          {title ? title : 'Untitled Warning'}
        </Typography>
      </Box>

      <Typography sx={{fontSize: 14, textAlign: 'justify'}}>
        {content ? content : 'No content'}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          '& button': {
            px: 2,
            fontSize: 14,
            fontWeight: 700,
            textTransform: 'none',
          },
        }}
      >
        <Button
          size="small"
          sx={{
            backgroundColor: color.red,
            color: 'white',
            '&:hover': {backgroundColor: '#FF2424'},
          }}
        >
          {delContent ? delContent : 'Delete'}
        </Button>
        <Button
          onClick={onClose}
          sx={{
            color: '#818181',
          }}
        >
          {cancelContent ? cancelContent : 'Cancel'}
        </Button>
      </Box>
    </Paper>
  );
}

export default WarningPopup;