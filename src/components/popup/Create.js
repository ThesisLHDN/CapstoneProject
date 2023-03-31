import {useState} from 'react';
import {Box, Paper, Typography, Button, TextField, Dialog} from '@mui/material';
import {color} from 'src/style';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';

function CreationPopup({
  title,
  onSubmit,
  content,
  confirmContent,
  cancelContent,
  icon,
  fieldLabel,
  placeholder,
  sx,
  onClose,
  open,
}) {
  const [input, setInput] = useState('');
  const handleKeyPress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === 'Enter') {
      onSubmit(input);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
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
            {icon && ''}
            {title ? title : 'Untitled Warning'}
          </Typography>
        </Box>

        <Typography sx={{fontSize: 14, textAlign: 'justify'}}>
          {fieldLabel ? fieldLabel : 'Untitled field'}
        </Typography>
        <TextField
          size="small"
          placeholder={placeholder}
          sx={{
            width: '100%',
            '& *': {fontSize: 14},
          }}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
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
          {' '}
          <Button
            onClick={onClose}
            sx={{
              color: '#818181',
            }}
          >
            {cancelContent ? cancelContent : 'Cancel'}
          </Button>
          <Button
            size="small"
            sx={{
              backgroundColor: color.green03,
              color: 'white',
              '&:hover': {backgroundColor: '#1BB738'},
            }}
            onClick={() => {
              onSubmit(input);
              setInput(false);
            }}
          >
            {confirmContent ? confirmContent : 'Delete'}
          </Button>
        </Box>
      </Paper>
    </Dialog>
  );
}

export default CreationPopup;
