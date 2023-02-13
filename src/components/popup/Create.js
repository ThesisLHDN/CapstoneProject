import React from 'react';
import {Box, Paper, Typography, Button, TextField} from '@mui/material';
import {color} from 'src/style';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';

function CreationPopup({
  title,
  content,
  confirmContent,
  cancelContent,
  icon,
  fieldLabel,
  placeholder,
  sx,
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
            color: color.green03,
            '& *': {fontSize: 18},
          }}
        >
          {icon && <ReportRoundedIcon />}
          {title ? title : 'Untitled Warning'}
        </Typography>
      </Box>

      <Typography sx={{fontSize: 14, textAlign: 'justify'}}>
        {/* {content ? content : 'No content'} */}
        {fieldLabel ? fieldLabel : 'Untitled field'}
      </Typography>
      <TextField
        size="small"
        placeholder={placeholder}
        sx={{
          width: '100%',
          '& *': {fontSize: 14},
        }}
      ></TextField>
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
            backgroundColor: color.green03,
            color: 'white',
            '&:hover': {backgroundColor: '#1BB738'},
          }}
        >
          {confirmContent ? confirmContent : 'Delete'}
        </Button>
        <Button
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

export default CreationPopup;
