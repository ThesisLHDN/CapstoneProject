import React, {useContext, useState} from 'react';
import {Box, Paper, Typography, Button, TextField, Dialog} from '@mui/material';
import {color} from 'src/style';
import {AppContext} from 'src/Context/AppProvider';
import axios from 'axios';
import {useLocation} from 'react-router-dom';

function AddMember(props) {
  const {onClose, open} = props;
  const {project} = useContext(AppContext);
  const location = useLocation();
  const pId = location.pathname.split('/')[2];
  const [data, setData] = useState({
    email: '',
    projectId: pId,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setData({...data, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/pmember', data);
      onClose();
    } catch (err) {
      console.log(err);
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
            Add Member to {project.pname}
          </Typography>
        </Box>

        <Typography sx={{fontSize: 14, textAlign: 'justify'}}>
          Enter emails
        </Typography>
        <TextField
          size="small"
          placeholder="e.g. dangnguyen@gmail.com"
          sx={{
            width: '100%',
            '& *': {fontSize: 14},
          }}
          name="email"
          onChange={handleChange}
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
            Cancel
          </Button>
          <Button
            size="small"
            sx={{
              backgroundColor: color.green03,
              color: 'white',
              '&:hover': {backgroundColor: '#1BB738'},
            }}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Box>
      </Paper>
    </Dialog>
  );
}

export default AddMember;
