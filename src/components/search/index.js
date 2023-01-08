import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  IconButton,
  InputAdornment,
  TextField,
  FormControl,
} from '@mui/material';
// import Input from "@mui/material/Input";
// import FilledInput from "@mui/material/FilledInput";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import InputAdornment from '@mui/material/InputAdornment';
// import FormHelperText from "@mui/material/FormHelperText";
// import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
// import {Typography} from '@mui/material';

const SearchBar = (props) => (
  //   <form>
  //     <TextField
  //       id="search-bar"
  //       className="text"
  //       onInput={(e) => {
  //         setSearchQuery(e.target.value);
  //       }}
  //       label="Enter a city name"
  //       variant="outlined"
  //       placeholder="Search..."
  //       size="small"
  //       startAdornment={
  //         <InputAdornment position="start">
  //           <SearchIcon />
  //         </InputAdornment>
  //       }
  //     />
  //     <IconButton type="submit" aria-label="search">
  //       <SearchIcon style={{ fill: "blue" }} />
  //     </IconButton>
  //   </form>
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
    {/* <InputLabel
      htmlFor="outlined-adornment-password"
      sx={{ fontSize: 12 }}
      size="small"
    >
      Search for Issues, Documents
    </InputLabel> */}
    <TextField
      //   id="outlined-adornment-password"
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
      //   sx={{
      //     "& .MuiInputBase-input": {
      //       padding: "0px",
      //     },
      //   }}
      //   sx={{
      //     "& .MuiOutlinedInput-notchedOutline": {
      //       border: "None",
      //       backgroundColor: "#EEE"
      //     },
      //   }}
      //   type={values.showPassword ? "text" : "password"}
      //   value={values.password}
      //   onChange={handleChange("password")}
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
      // startAdornment={
      //   <InputAdornment position="start">
      //     <IconButton
      //       aria-label="toggle password visibility"
      //       // onClick={handleClickShowPassword}
      //       // onMouseDown={handleMouseDownPassword}
      //       edge="end"
      //     >
      //       <SearchIcon />
      //     </IconButton>
      //   </InputAdornment>
      // }
    />
  </FormControl>
);

export default SearchBar;
