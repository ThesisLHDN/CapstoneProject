import React, {useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  IconButton,
  InputAdornment,
  TextField,
  FormControl,
} from '@mui/material';

function SearchBar(props) {
  return (
    <FormControl
      sx={{
        width: 500,
        ...props.sx,
        '& .MuiFormControl-root.MuiTextField-root': props.round
          ? {borderRadius: 40}
          : {borderRadius: 10},
        '& input::placeholder': {
          fontSize: 14,
        },
      }}
      variant="outlined"
    >
      <TextField
        size="small"
        placeholder="Search"
        sx={{
          backgroundColor: '#EEE',
          borderRadius: 2,
          '& .MuiOutlinedInput-notchedOutline': {
            border: '0px',
            borderRadius: 2,
          },
        }}
        onChange={(e) => props.setInput(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                aria-label="toggle password visibility"
                // onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
}

export default SearchBar;
