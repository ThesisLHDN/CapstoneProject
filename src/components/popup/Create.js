import {useState} from 'react';
import {Box, Paper, Typography, Button, TextField, Dialog} from '@mui/material';
import {color, colorHover} from 'src/style';

function CreationPopup({
  title,
  onSubmit,
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
  const [error, setError] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmitHandler(input);
      setInput(false);
    }
  };

  const onSubmitHandler = (field) => {
    if (field) {
      console.log('submit', field);
      onSubmit(field);
      setError();
      setInput(false);
    } else {
      setError('Please input a valid value');
      setInput(false);
    }
  };

  const onCancelHandler = () => {
    setInput(false);
    setError();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onCancelHandler}>
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
        {error && (
          <Typography variant="subtitle2" sx={{color: 'red', fontSize: '12px'}}>
            {error}
          </Typography>
        )}
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
            onClick={onCancelHandler}
            sx={{
              color: '#818181',
            }}
          >
            {cancelContent ? cancelContent : 'Cancel'}
          </Button>
          <Button
            size="small"
            sx={{
              ...colorHover.greenGradBtn,
              // backgroundColor: color.green03,
              // color: 'white',
              // '&:hover': {backgroundColor: '#1BB738'},
            }}
            onClick={() => onSubmitHandler(input)}
          >
            {confirmContent ? confirmContent : 'Confirm'}
          </Button>
        </Box>
      </Paper>
    </Dialog>
  );
}

export default CreationPopup;
